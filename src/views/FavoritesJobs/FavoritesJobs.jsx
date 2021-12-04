import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CardsSkeleton, LoadMoreBtn, ProjectCard } from "../../components";
import { Layout } from "../../Containers";
import { successToast } from "../../helper/toastMessage";
import {
  getFavoritesJobs,
  resetFavoritesJobs,
} from "../../redux/actions/commonData";
import { saveJob } from "../../redux/actions/userAction";

function FavoritesJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.commonData.favoritesJobs);
  const loading = useSelector((state) => state.commonData.loading);
  const [jobsState, setJobsState] = useState(jobs);
  const mounted = useRef();
  let [jobsFilter, setJobsFilter] = useState({
    page: 1,
  });
  const jobSaveFunctionally = (id, type) => {
    let newJobs = [];

    dispatch(saveJob(id, type)).then((res) => {
      newJobs = jobsState.data.filter((item, index) => item.id !== id);
      successToast(res.data.message);
      setJobsState({ data: newJobs });
    });
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      dispatch(resetFavoritesJobs());
      dispatch(getFavoritesJobs(jobsFilter));
    } else {
      dispatch(getFavoritesJobs(jobsFilter));
    }
  }, [dispatch, jobsFilter]);

  useEffect(() => {
    setJobsState(jobs);
  }, [jobs, jobsFilter]);

  const getNextPage = () => {
    setJobsFilter((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="m-auto" md={{ span: 8, offset: 4 }}>
            {jobsState.data.length > 0 &&
              jobsState.data.map((job) => (
                <ProjectCard
                  key={job.id}
                  job={job}
                  jobSaveFunctionally={jobSaveFunctionally}
                />
              ))}

            {loading &&
              [...Array(16)].map((item, idx) => (
                <div key={idx}>
                  <CardsSkeleton
                    height={250}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
              ))}

            {jobsState.data.length > 0 && (
              <LoadMoreBtn
                hasMorePages={
                  jobs?.meta?.has_more_pages
                    ? jobs?.meta?.has_more_pages
                    : false
                }
                getNextPage={getNextPage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default FavoritesJobs;
