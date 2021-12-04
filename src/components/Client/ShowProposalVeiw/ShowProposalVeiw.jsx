import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { GeoAltFill, Clock, Calendar2WeekFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import style from "./ShowProposalVeiw.module.scss";
import { proposalDetails } from "../../../redux/actions/userAction";
import { CardsSkeleton } from "../../index";
import moment from "moment";
import { useTranslation } from "react-i18next";

function ShowProposalVeiw({ getClientInfo }) {
  const [proposalData, setProposalData] = useState({});
  const { id: proposalId } = useParams();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      dispatch(proposalDetails(proposalId)).then((res) => {
        setProposalData(res.data.data.proposal);
        getClientInfo(res.data.data.proposal.project);
      });
    }
  }, [dispatch, proposalId, getClientInfo]);

  return Object.keys(proposalData).length > 0 ? (
    <>
      <h5>مشاهدة العرض</h5>

      <div className={style.offerContent}>
        <Row>
          <Col lg={3}>
            <h2>
              {proposalData?.project?.title}
              <span>{proposalData?.project?.sub_category?.name}</span>
            </h2>
          </Col>
          <Col lg={3}>
            <p>
              {proposalData?.project?.posted_by?.name}
              <span>
                <GeoAltFill fill="#154ed4" />{" "}
                {proposalData?.project?.posted_by?.country}
              </span>
            </p>
          </Col>
          <Col lg={3}></Col>
          <Col lg={3} className="my-auto">
            <h4>
              <span>
                <Clock />{" "}
                {moment.unix(proposalData?.project?.published_at).fromNow()}{" "}
              </span>
              {`${
                proposalData?.project?.budget[proposalData?.project?.currency]
                  .from
              }-${
                proposalData?.project?.budget[proposalData?.project?.currency]
                  .to
              } ${proposalData?.project?.currency.toUpperCase()}`}
            </h4>
          </Col>
        </Row>
      </div>

      <div className={style.offerContent}>
        <Row className="show">
          <Col lg={3} className="my-auto">
            <h2>الشروط والأحكام</h2>
          </Col>
          <Col lg={3}></Col>
          <Col lg={3}></Col>
          <Col lg={3} className="my-auto">
            <Button
              type="button"
              className={`btn btn-primary ${style.changeTerms}`}
              as={Link}
              to={`/${i18n.language}/submit-proposal/${proposalData.id}/edit`}
            >
              تغيير الشروط
            </Button>
          </Col>
        </Row>

        <Row className="show">
          <Col lg={3} className="my-auto">
            <p>الفترة الزمنية بالأيام</p>
            <p>{proposalData?.period}</p>
          </Col>
          <Col lg={3}>
            <p>السعر</p>
            <p>
              {proposalData?.price}{" "}
              {proposalData?.price_currency &&
                proposalData?.price_currency?.toUpperCase()}
            </p>
          </Col>
          <Col lg={3}></Col>
          <Col lg={3}></Col>
        </Row>

        <Row className="show">
          <Col lg={3} className="my-auto">
            <h2>الشروط والأحكام</h2>
          </Col>
          <Col lg={3}></Col>
          <Col lg={3}></Col>
          <Col lg={3}></Col>
        </Row>

        {proposalData?.milestones &&
          proposalData?.milestones.map((milestone, index) => (
            <Row className="show" key={index}>
              <Col lg={3} className="my-auto">
                <p>اسم الدفعة</p>
                <p>{milestone?.name}</p>
              </Col>
              <Col lg={3}>
                <p>الكمية</p>
                <p>
                  {milestone?.amount}{" "}
                  {proposalData?.price_currency &&
                    proposalData?.price_currency.toUpperCase()}
                </p>
              </Col>
              <Col lg={3}>
                <p>التاريخ المستحق</p>
                <p>
                  <Calendar2WeekFill />{" "}
                  {moment.unix(milestone?.due_date).format("l")}
                </p>
              </Col>
              <Col lg={3}></Col>
            </Row>
          ))}
      </div>
    </>
  ) : (
    <div>
      <CardsSkeleton height={40} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={100} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={250} style={{ marginBottom: "20px" }} />
    </div>
  );
}

export default ShowProposalVeiw;
