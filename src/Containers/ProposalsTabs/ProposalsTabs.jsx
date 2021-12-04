import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Image, Nav, Row, Tab } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import EmptyImage from "../../assets/img/noDataFound.png";
import { CardsSkeleton, LoadMoreBtn, Sort } from "../../components";
import { errorToast } from "../../helper/toastMessage";
import { getProposals } from "../../redux/actions/userAction";
import style from "./ProposalsTabs.module.scss";

function ProposalsTabs() {
  const { tab } = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();

  // Change requestType
  const changeRequestType = (key) => {
    switch (key) {
      case "published":
        return "proposals";
      case "draft":
        return "proposals";
      case "pending":
        return "invitation";
      default:
        return "proposals";
    }
  };
  let [proposalsFilter, setProposalsFilter] = useState({
    sortBy: "newest",
    requestType: changeRequestType(tab) || "proposals",
    search: "",
    type: tab || "published",
    page: 1,
  });
  const tabs = [
    { key: "published", name: "الفعالة" },
    { key: "pending", name: "الدعوة لمقابلة" },
    // { key: "archived", name: "مأرشفة" },
    { key: "draft", name: "المسودة" },
  ];
  const sortList = [
    { key: "newest", name: t("button.newest") },
    { key: "oldest", name: t("button.oldest") },
    { key: "highest_price", name: t("button.highest_price") },
    { key: "lowest_price", name: t("button.lowest_price") },
  ];
  // On Load page set Default tab
  const handleDefaultActive = () => {
    // there is Tab in the Route
    if (tab) {
      return tab;
    } else {
      // there is no tab in route
      history.push(`/${i18n.language}/proposals/${proposalsFilter.type}`);
      return proposalsFilter.type;
    }
  };

  // On Click tab set type Key and push type in Route
  const handleSelect = (key) => {
    setProposalsFilter((prevState) => ({
      ...prevState,
      type: key,
      requestType: changeRequestType(key),
    }));
    history.push(`/${i18n.language}/proposals/${key}`);
  };
  useEffect(() => {
    setContent([]);
    dispatch(getProposals(proposalsFilter))
      .then((res) => {
        setContent(res.data.data[changeRequestType(tab)]);
      })
      .catch((error) => {
        errorToast(error.message);
      });
  }, [proposalsFilter, dispatch, setContent, tab]);

  const getNextPage = () => {
    setProposalsFilter((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const getSortValue = (value) => {
    setProposalsFilter((prevState) => ({
      ...prevState,
      sortBy: value,
      page: 1,
    }));
  };

  const onSearch = (value) => {
    setProposalsFilter((prevState) => ({
      ...prevState,
      page: 1,
      search: value,
    }));
  };
  return (
    <Tab.Container
      id='left-tabs-example'
      defaultActiveKey={handleDefaultActive}
      onSelect={(key) => handleSelect(key)}>
      <Row>
        <h5>العقود</h5>
        <Col lg={6} className={style.contacts}>
          <Nav className={`${style.tabsContainer} contractsTabs`}>
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key}>
                  <b>{tab.name}</b>
                  {/* <span>(4)</span> */}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col lg={2}></Col>

        <Col lg={2} md={6} className={style.contactsSearch}>
          <div className={`form-group ${style.hasSearch}`}>
            <Search />
            <input
              type='text'
              className={`${style.formControl} form-control`}
              placeholder=' بحث '
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </Col>
        <Col lg={2} md={6} className={style.contactsSelect}>
          {/* <label>ترتيب</label> */}
          <Sort getSortValue={getSortValue} list={sortList} />
          {/* <select
            className={style.customSelect}
            id="validationDefault04"
            required=""
          >
            <option>الأحدث</option>
            <option>..ss.</option>
          </select> */}
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          {content.meta && content.data?.length !== 0 && (
            <>
              {content.data.map((item) => (
                <Tab.Content className={style.tabLink} key={item.id}>
                  <Tab.Pane
                    transition={true}
                    eventKey={tab}
                    className={style.portfolioContainer}>
                    <Row
                      className={`${style.contactsDetails} portfolio-item filter-card`}>
                      <ul>
                        <li className='col-lg-4'>
                          <Link
                            as={Link}
                            to={`/${i18n.language}/${
                              changeRequestType(tab) === "proposals"
                                ? `show-proposal/${item.id}`
                                : `submit-proposal/${item.project.id}`
                            }`}>
                            <h2>
                              {item.project.title}
                              <span>{item.project.description}</span>
                            </h2>
                          </Link>
                        </li>
                        <li className='col-lg-4'>
                          <p>
                            <span>تاريخ العقد</span>
                            {moment(item.project.published_at * 1000).format(
                              "YYYY-MM-DD"
                            )}{" "}
                          </p>
                        </li>
                        <li className='col-lg-2'>
                          <p>
                            <span>نشر بواسطة</span>
                            {item.project.posted_by.name}
                          </p>
                        </li>
                        <li className={`col-lg-2 ${style.price}`}>
                          ‏{item.price} {item.price_currency}
                        </li>
                        {/* <li className="col-lg-2">
                          <button type="button" className="btn btn-primary">
                            <ChatLeftDotsFill />
                            تحدث مع العميل
                          </button>
                        </li>
                        <li className="col-lg-1 my-auto">
                          <ThreeDots />
                        </li> */}
                      </ul>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              ))}
            </>
          )}

          {!content.meta && (
            <>
              {[...Array(5)].map((item, index) => (
                <div key={index}>
                  <CardsSkeleton
                    height={120}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
              ))}
            </>
          )}

          {content.data?.length === 0 && (
            <div className='text-center h-100'>
              <Image src={EmptyImage} alt='empty' />
              <p>There is No proposals in This Tab</p>
            </div>
          )}
        </Col>
      </Row>

      {content.meta && content.data?.length !== 0 && (
        <LoadMoreBtn
          hasMorePages={
            content?.meta?.has_more_pages
              ? content?.meta?.has_more_pages
              : false
          }
          getNextPage={getNextPage}
        />
      )}
    </Tab.Container>
  );
}

export default ProposalsTabs;
