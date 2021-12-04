import React, { useState, useEffect } from "react";
import { Col, Nav, Row, Tab, Image } from "react-bootstrap";
import { CardsSkeleton, LoadMoreBtn, Sort } from "../../components";
import { Search, ThreeDots, ChatLeftDotsFill } from "react-bootstrap-icons";
import style from "./ContractsTabs.module.scss";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getContracts } from "../../redux/actions/userAction";
import { errorToast } from "../../helper/toastMessage";
import moment from "moment";
import { Link } from "react-router-dom";
import EmptyImage from "../../assets/img/noDataFound.png";

function ContractsTabs() {
  const { tab } = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();
  let [contractsFilter, setContractsFilter] = useState({
    sortBy: "newest",
    search: "",
    type: tab || "active",
    page: 1,
  });
  const tabs = [
    { key: "active", name: "الفعالة" },
    { key: "completed", name: "المغلقة" },
    { key: "disputed", name: "الملغاة" },
    { key: "pending", name: "العروض المقدمة" },
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
      history.push(`/${i18n.language}/contracts/${contractsFilter.type}`);
      return contractsFilter.type;
    }
  };
  // On Click tab set type Key and push type in Route
  const handleSelect = (key) => {
    setContractsFilter((prevState) => ({
      ...prevState,
      type: key,
    }));
    history.push(`/${i18n.language}/contracts/${key}`);
  };
  useEffect(() => {
    setContent([]);
    dispatch(getContracts(contractsFilter))
      .then((res) => {
        setContent(res.data.data.contracts);
      })
      .catch((error) => {
        errorToast(error.message);
      });
  }, [contractsFilter, dispatch, setContent]);

  const getNextPage = () => {
    setContractsFilter((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const getSortValue = (value) => {
    setContractsFilter((prevState) => ({
      ...prevState,
      sortBy: value,
      page: 1,
    }));
  };

  const onSearch = (value) => {
    setContractsFilter((prevState) => ({
      ...prevState,
      page: 1,
      search: value,
    }));
  };
  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={handleDefaultActive}
      onSelect={(key) => handleSelect(key)}
    >
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
              type="text"
              className={`${style.formControl} form-control`}
              placeholder=" بحث "
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
                    className={style.portfolioContainer}
                  >
                    <Row
                      className={`${style.contactsDetails} portfolio-item filter-card`}
                    >
                      <ul>
                        <li className="col-lg-2">
                          <Link
                            as={Link}
                            to={`/${i18n.language}/contract-details/${item.id}`}
                          >
                            <h2>
                              {item.title}
                              <span>{item.work_details}</span>
                            </h2>
                          </Link>
                        </li>
                        <li className="col-lg-2">
                          <p>
                            <span>تاريخ العقد</span>
                            {moment(item.start_date * 1000).format(
                              "YYYY-MM-DD"
                            )}{" "}
                          </p>
                        </li>
                        <li className="col-lg-2">
                          <p>
                            <span>نشر بواسطة</span>
                            {item.employer.name}
                          </p>
                        </li>
                        <li className={`col-lg-2 ${style.price}`}>
                          ‏{item.amount} {item.currency}
                        </li>
                        <li className="col-lg-2">
                          <button type="button" className="btn btn-primary">
                            <ChatLeftDotsFill />
                            تحدث مع العميل
                          </button>
                        </li>
                        <li className="col-lg-1 my-auto">
                          <ThreeDots />
                        </li>
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
            <div className="text-center h-100">
              <Image src={EmptyImage} alt="empty" />
              <p>There is No Contracts in This Tab</p>
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

export default ContractsTabs;
