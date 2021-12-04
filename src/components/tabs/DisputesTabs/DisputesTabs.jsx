import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  CardsSkeleton,
  LoadMoreBtn,
  DisputeDetailsModal,
} from "../../../components";
import { errorToast } from "../../../helper/toastMessage";
import { getDisputes } from "../../../redux/actions/userAction";
import EmptyImage from "../../../assets/img/noDataFound.png";
import style from "./DisputesTabs.module.scss";

function DisputesTabs() {
  const { tab } = useParams();
  const history = useHistory();
  const { i18n } = useTranslation();
  const [content, setContent] = useState([]);
  const [showDisputeDetailsModal, setShowDisputeDetailsModal] = useState(false);
  const [disputeDetailsData, setDisputeDetailsData] = useState({});
  const dispatch = useDispatch();
  let [contractsFilter, setContractsFilter] = useState({
    type: tab || "my",
    page: 1,
  });
  const tabs = [
    { key: "my", name: "نزاعاتي" },
    { key: "against_me", name: "نزاعات ضدي" },
  ];
  // On Load page set Default tab
  const handleDefaultActive = () => {
    // there is Tab in the Route
    if (tab) {
      return tab;
    } else {
      // there is no tab in route
      history.push(
        `/${i18n.language}/settings/disputes/${contractsFilter.type}`
      );
      return contractsFilter.type;
    }
  };
  // On Click tab set type Key and push type in Route
  const handleSelect = (key) => {
    setContractsFilter((prevState) => ({
      ...prevState,
      type: key,
    }));
    history.push(`/${i18n.language}/settings/disputes/${key}`);
  };
  useEffect(() => {
    setContent([]);
    dispatch(getDisputes(contractsFilter))
      .then((res) => {
        setContent(res.data.data.disputes);
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

  const getDisputeData = (data) => {
    setShowDisputeDetailsModal(true);
    setDisputeDetailsData(data);
  };

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={handleDefaultActive}
      onSelect={(key) => handleSelect(key)}
    >
      <Row>
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
      </Row>

      <Row>
        <DisputeDetailsModal
          isShow={showDisputeDetailsModal}
          handleClose={(e) => setShowDisputeDetailsModal(e)}
          data={disputeDetailsData}
        />
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
                        <li className="col-lg-3">
                          <h2
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => getDisputeData(item)}
                          >
                            {item.contract.title}
                            <span>
                              {item.contract?.project?.category?.name}
                            </span>
                          </h2>
                        </li>
                        <li className={`col-lg-3 ${style.price}`}>
                          ‏{item.amount}{" "}
                          {item.currency && item.currency?.toUpperCase()}
                        </li>

                        <li className="col-lg-3">
                          <p>
                            <span>نشر بواسطة</span>
                            {item.contract.employer.name}
                          </p>
                        </li>
                        <li className="col-lg-3">
                          <p>
                            <span>تاريخ العقد</span>
                            {moment(item.contract.created_at * 1000).format(
                              "YYYY-MM-DD"
                            )}{" "}
                          </p>
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
              <p>There is No Disputes in This Tab</p>
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

export default DisputesTabs;
