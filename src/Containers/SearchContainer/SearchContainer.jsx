import React, { useEffect, useRef, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { successToast } from "../../helper/toastMessage";
import EmptyImage from "../../assets/img/noDataFound.png";
import { formatDataFlat } from "../../helper/formatData";
import { previousSearchValue } from "../../redux/actions/commonData";

import {
  Activities,
  CardsSkeleton,
  FilterBar,
  LoadMoreBtn,
  PreviousSearch,
  ProjectCard,
  SearchBar,
  SearchTags,
  Sort,
} from "../../components";
import { getJobs, resetJobs } from "../../redux/actions/commonData";
import { saveJob } from "../../redux/actions/userAction";
// import style from "./SearchContainer.module.scss";

const SearchContainer = ({
  type,
  getPreviousSearch,
  saveFilterData,
  location,
}) => {
  const { categoryId } = useParams();
  const isMounted = useRef(false);
  let [jobsFilter, setJobsFilter] = useState({
    sortBy: "newest",
    timeline: [],
    proposal: [],
    categoryId: [],
    budget: [],
    search: "",
    page: 1,
  });
  let [tags, setTags] = useState({});
  // let [selectedFilter, setSelectedFilter] = useState([]);
  const jobs = useSelector((state) => state.commonData.jobs);
  const loading = useSelector((state) => state.commonData.loading);
  const timelineItems = useSelector((state) => state.commonData.timelineItems);
  const proposalList = useSelector((state) => state.commonData.proposalList);
  const previousSearch = useSelector(
    (state) => state.commonData.previousSearch
  );
  const treeCategories = useSelector(
    (state) => state.commonData.treeCategories
  );
  const [jobsState, setJobsState] = useState(jobs);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sortList = [
    { key: "newest", name: t("button.newest") },
    { key: "oldest", name: t("button.oldest") },
    { key: "highest_price", name: t("button.highest_price") },
    { key: "lowest_price", name: t("button.lowest_price") },
  ];

  useEffect(() => {
    if (categoryId === undefined) {
      if (!isMounted.current) {
        dispatch(resetJobs());
        dispatch(getJobs(jobsFilter));
        isMounted.current = true;
      } else {
        dispatch(getJobs(jobsFilter));
      }
    } else if (JSON.stringify([categoryId]) !== jobsFilter.categoryId) {
      setJobsFilter((prevState) => ({
        ...prevState,
        page: 1,
        categoryId: JSON.stringify([categoryId]),
      }));
      dispatch(resetJobs());
    } else {
      dispatch(getJobs(jobsFilter));
    }
  }, [jobsFilter, categoryId, location, dispatch]);

  useEffect(() => {
    setJobsState(jobs);
  }, [jobs, setJobsState]);

  useEffect(() => {
    if (Object.keys(previousSearch).length) {
      //  ? We must make a state
      getPreviousSearchFn(previousSearch);
    }
  }, [previousSearch]);

  useEffect(() => {
    if (saveFilterData) {
      //  ? We must make a state
      saveFilterData(jobsFilter);
    }
  }, [jobsFilter, saveFilterData]);

  const getNextPage = () => {
    setJobsFilter((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const getSortValue = (value) => {
    dispatch(resetJobs());
    setJobsFilter((prevState) => ({
      ...prevState,
      sortBy: value,
      page: 1,
    }));
  };

  const onFilterChange = (value, key) => {
    let ids = [];
    value.map((item) => ids.push(item.value));
    dispatch(resetJobs());
    setTags((prev) => ({ ...prev, [key]: value }));

    setJobsFilter((prevState) => ({
      ...prevState,
      page: 1,
      [key]: JSON.stringify(ids),
    }));
  };

  const removeFilter = (value, key) => {
    let ids;
    let newTags;
    if (Object.keys(previousSearch).length > 0) {
      dispatch(previousSearchValue({}));
    }
    if (key !== "search") {
      ids = JSON.parse(jobsFilter[key]).filter((item) => item !== value);
      newTags = tags[key].filter((tag) => tag.value !== value);
    } else if (key === "search") {
      ids = "";
      newTags = [];
    }
    dispatch(resetJobs());
    setTags((prev) => ({ ...prev, [key]: newTags }));
    setJobsFilter((prevState) => ({
      ...prevState,
      page: 1,
      [key]: key !== "search" ? JSON.stringify(ids) : ids,
    }));
  };

  const onResetFilter = () => {
    dispatch(resetJobs());
    if (Object.keys(previousSearch).length > 0) {
      dispatch(previousSearchValue({}));
    }
    setTags({ categoryId: [], search: [], timeline: [], proposal: [] });
    setJobsFilter({
      sortBy: "newest",
      timeline: [],
      proposal: [],
      categoryId: [],
      budget: [],
      search: "",
      page: 1,
    });
  };

  const onSearch = (value) => {
    dispatch(resetJobs());
    if (value !== "") {
      setTags((prev) => ({
        ...prev,
        search: [{ label: value, value: value }],
      }));
    } else {
      setTags((prev) => ({
        ...prev,
        search: [],
      }));
    }
    setJobsFilter((prevState) => ({
      ...prevState,
      page: 1,
      search: value,
    }));
  };

  const jobSaveFunctionally = (id, type) => {
    const newJobs = jobsState;
    dispatch(saveJob(id, type)).then((res) => {
      newJobs.data.map((item, index) => {
        if (id === item.id) {
          if (type === "unsave") {
            item.is_saved = false;
          } else {
            item.is_saved = true;
          }
        }
        return null;
      });
      successToast(res.data.message);
    });

    setJobsState(newJobs);
  };

  const getPreviousSearchFn = (searchData) => {
    dispatch(resetJobs());
    const options = formatDataFlat(treeCategories);
    let categoryId = [];
    options.map((item) =>
      JSON.parse(searchData.data.categoryId).map(
        (categoryIdItem) =>
          item.value === parseInt(categoryIdItem) && categoryId.push(item)
      )
    );
    let reFormatTimeline = [];
    timelineItems.map((item) =>
      reFormatTimeline.push({
        dataName: item.title,
        value: item.id,
        label: item.title,
      })
    );
    let timeline = [];
    reFormatTimeline.map((item) =>
      JSON.parse(searchData.data.timeline).map(
        (timelineItem) =>
          parseInt(timelineItem) === item.value && timeline.push(item)
      )
    );
    let proposal = [];
    proposalList.map((item) =>
      JSON.parse(searchData.data.proposal).map(
        (proposalItem) => proposalItem === item.value && proposal.push(item)
      )
    );
    setTags((prev) => ({
      ...prev,
      ...(searchData.searched_title && {
        search: [
          {
            label: searchData.searched_title,
            value: searchData.id,
          },
        ],
      }),
      ...(JSON.parse(searchData.data.categoryId) && {
        categoryId: categoryId,
      }),
      ...(JSON.parse(searchData.data.timeline) && {
        timeline: timeline,
      }),
      ...(JSON.parse(searchData.data.proposal) && {
        proposal: proposal,
      }),
    }));

    setJobsFilter((prevState) => ({
      ...prevState,
      page: 1,
      search: searchData?.searched_title ? searchData?.searched_title : "",
      categoryId: searchData?.data?.categoryId
        ? searchData?.data?.categoryId
        : [],
      timeline: searchData?.data?.timeline ? searchData?.data?.timeline : [],
      proposal: searchData?.data?.proposal ? searchData?.data?.proposal : [],
      budget: [],
    }));
  };

  return (
    <>
      <Col lg='2'>
        {type === "home" && (
          <PreviousSearch getPreviousSearch={getPreviousSearchFn} />
        )}
        {type === "search" && (
          <FilterBar
            selectedFilter={tags.categoryId}
            selectedProposal={tags.proposal}
            selectedTimeline={tags.timeline}
            type='projects'
            onFilterChange={onFilterChange}
          />
        )}
      </Col>
      <Col lg='8'>
        {type === "search" && <h5>بحث في الوظائف</h5>}

        {type === "home" && <Activities />}
        <SearchBar onSearch={onSearch} searchValue={tags?.search} />
        {type === "search" && (
          <SearchTags
            tags={tags}
            onRemoveFilter={removeFilter}
            onResetFilter={onResetFilter}
          />
        )}
        <Sort
          type={type}
          jobs={jobs}
          getSortValue={getSortValue}
          list={sortList}
        />
        {jobsState.data.map((job) => (
          <ProjectCard
            key={job.id}
            job={job}
            jobSaveFunctionally={jobSaveFunctionally}
          />
        ))}
        {loading &&
          [...Array(16)].map((item, idx) => (
            <div key={idx}>
              <CardsSkeleton height={250} style={{ marginBottom: "20px" }} />
            </div>
          ))}

        {jobs.data.length === 0 && !loading && (
          <div className='text-center h-100'>
            <Image src={EmptyImage} alt='empty' />
            <p>There is No jobs </p>
          </div>
        )}
        <LoadMoreBtn
          hasMorePages={
            jobs?.meta?.has_more_pages ? jobs?.meta?.has_more_pages : false
          }
          getNextPage={getNextPage}
        />
      </Col>
    </>
  );
};

export default SearchContainer;
