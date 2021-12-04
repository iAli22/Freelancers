import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import style from "./ContractDetailsVeiw.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { contractDetails } from "../../../redux/actions/userAction";
import { CardsSkeleton, SubmitForPaymentModal } from "../../index";
import moment from "moment";

function ContractDetailsVeiw({ getClientInfo }) {
  const dispatch = useDispatch();
  const { id: contractId } = useParams();
  const mounted = useRef();
  const [contractData, setContractData] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);

  useEffect(() => {
    if (!mounted.current || isModalSubmitted) {
      mounted.current = true;
      setIsModalSubmitted(false);
      dispatch(contractDetails(contractId)).then((res) => {
        setContractData(res.data.data);
        getClientInfo({
          ...res.data.data.contract.project,
          proposal_id: res.data.data.contract.proposal_id,
        });
      });
    }
  }, [dispatch, contractId, getClientInfo, isModalSubmitted]);

  return Object.keys(contractData).length > 0 ? (
    <div className={`${style.offerContent} ${style.mobileAppDesign}`}>
      {showSubmitModal && (
        <SubmitForPaymentModal
          isShow={showSubmitModal}
          handleClose={() => setShowSubmitModal(false)}
          milestone={milestone}
          isReadOnly={isReadOnly}
          setIsModalSubmitted={setIsModalSubmitted}
        />
      )}

      <h3>
        {contractData?.contract?.title}{" "}
        <span>
          فعال منذ {moment.unix(contractData?.contract?.start_date).format("l")}
        </span>
      </h3>
      <h2>المدفوعات والمكتسبات</h2>

      <ul>
        <li>
          <p>الميزانية</p>
          {/* <p>5000 ريال</p> */}
          <p>
            {contractData?.contract?.amount}{" "}
            {contractData?.contract?.currency?.toUpperCase()}
          </p>
        </li>
        <li>
          <p>في الضمان</p>
          {/* <p>5000 ريال</p> */}
          <p>
            {contractData?.contract?.amount_in_escrow}{" "}
            {contractData?.contract?.currency?.toUpperCase()}
          </p>
        </li>
        <li>
          <p>المدفوع</p>
          <p>
            {contractData?.contract?.amount_paid_to_freelancer}{" "}
            {contractData?.contract?.currency?.toUpperCase()}
          </p>
          {/* <p>00.00 ريال</p> */}
        </li>
        <li>
          <p>المتبقي</p>
          <p>
            {contractData?.contract?.remaining_amount_for_freelancer}{" "}
            {contractData?.contract?.currency?.toUpperCase()}
          </p>
          {/* <p>00.00 ريال</p> */}
        </li>
        <li>
          <p>
            <InfoCircleFill fill="#00c7d4" /> أجمالي الكسب
          </p>
          <p>
            {contractData?.contract?.freelancer_total_earning}{" "}
            {contractData?.contract?.currency?.toUpperCase()}
          </p>
          {/* <p>00.00 ريال</p> */}
        </li>
      </ul>

      <h2 className={style.mobileAppTitle}>الدفعات المتبقية</h2>
      {contractData?.contract?.milestones?.map((milestone, index) => (
        <Row className={style.mobileApp} key={index}>
          <Col lg={1}>
            <p>{index + 1}</p>
          </Col>
          <Col lg={2}>
            <p>{milestone?.title}</p>
          </Col>
          <Col lg={2}>
            <p>
              {milestone?.amount}{" "}
              {contractData?.contract?.currency?.toUpperCase()}
            </p>
          </Col>
          <Col lg={2}>
            <p>
              <span>الحالة</span>
              {milestone?.status}
            </p>
          </Col>
          <Col lg={2}></Col>
          <Col lg={3}>
            {milestone?.status === "pending" ? (
              <button
                type="button"
                className={`btn btn-primary ${style.changeTerms}`}
                onClick={() => {
                  setShowSubmitModal(true);
                  setMilestone(milestone);
                }}
              >
                قدم للدفع
              </button>
            ) : (
              <button
                type="button"
                className={`btn btn-primary ${style.changeTerms} ${
                  milestone?.status !== "pending" && style.invoice
                }`}
                onClick={() => {
                  setShowSubmitModal(true);
                  setMilestone(milestone);
                  setIsReadOnly(true);
                }}
              >
                عرض الفاتورة
              </button>
            )}
          </Col>
        </Row>
      ))}
    </div>
  ) : (
    <div>
      <CardsSkeleton
        height={350}
        style={{ marginTop: "60px", marginBottom: "20px" }}
      />
    </div>
  );
}

export default ContractDetailsVeiw;
