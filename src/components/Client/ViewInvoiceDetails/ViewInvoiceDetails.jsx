import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import style from "./ViewInvoiceDetails.module.scss";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { contractDetails } from "../../../redux/actions/userAction";
import { CardsSkeleton } from "../../index";
import moment from "moment";

function ViewInvoiceDetails({ getClientInfo }) {
  const dispatch = useDispatch();
  const { id: contractId } = useParams();
  const mounted = useRef();

  const [contractData, setContractData] = useState({});

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      dispatch(contractDetails(contractId)).then((res) => {
        setContractData(res.data.data);
        getClientInfo({
          ...res.data.data.contract.project,
          proposal_id: res.data.data.contract.proposal_id,
        });
      });
    }
  }, [dispatch, contractId, getClientInfo]);

  return Object.keys(contractData).length > 0 ? (
    <>
      <h5>الفاتورة</h5>

      <div className={`${style.offerContent} ${style.bill}`}>
        <Row>
          <Col lg={4}>
            <p> اسم العقد</p>
            <h3> {contractData?.contract?.title}</h3>
          </Col>
          <Col lg={4}>
            <p> الحالة</p>
            <p>{contractData?.contract?.status}</p>
          </Col>
          <Col lg={4}>
            <p> الوظيفة المتعلقة</p>
            <h2>{contractData?.contract?.title}</h2>
          </Col>
        </Row>

        <Row>
          <Col lg={4}>
            <p> قسم الوظيفة</p>
            <button
              type="button"
              className={`btn btn-primary  ${style.invoice}`}
            >
              {/* تطوير برامج */}
              {contractData?.contract?.project?.sub_category?.name}
            </button>
            <button
              type="button"
              className={`btn btn-primary  ${style.invoice}`}
            >
              {/* تطوير مواقع */}
              {contractData?.contract?.project?.category?.name}
            </button>
          </Col>
          <Col lg={4}>
            <p> تاريخ العرض</p>
            <p>
              {contractData?.contract?.start_date &&
                moment.unix(contractData?.contract?.start_date).format("l")}
            </p>
          </Col>
          <Col lg={4}>
            <p> ينتهي العرض</p>
            <p>
              {contractData?.contract?.expired_at &&
                moment.unix(contractData?.contract?.expired_at).format("l")}
            </p>
          </Col>
        </Row>
      </div>
      <div className={style.pay}>
        <Row>
          <Col lg={3}>
            <h2>دفع</h2>
          </Col>
          <Col lg={9}>
            <h4>‏750 ريال</h4>
          </Col>
        </Row>
      </div>
      <div className={style.pay}>
        <Row>
          <Col lg={3}>
            <h2>مصاريف قاف</h2>
          </Col>
          <Col lg={9}>
            <h4>‏250 ريال</h4>
          </Col>
        </Row>
      </div>
      <div className={style.pay}>
        <Row>
          <Col lg={3}>
            <h2>
              سوف تحصل علي <span>كامل المبلغ الذي سيراه العميل</span>
            </h2>
          </Col>
          <Col className="my-auto">
            <h4>‏3440 ريال</h4>
          </Col>
        </Row>
      </div>
      <div className={style.pay}>
        <Row>
          <Col lg={3}>
            <h2>وصف للعمل</h2>
          </Col>
          <Col lg={9}>
            <p>
              {/* استخدم هذا الطلب لكي تطلب موافقة علي العمل الذي أنجزته وسيتم تحويل
              الأموال بمجرد الحصول علي الموافقة */}
              {contractData?.contract?.project?.description}
            </p>
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <div>
      <CardsSkeleton height={40} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={200} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={80} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={80} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={100} style={{ marginBottom: "20px" }} />
      <CardsSkeleton height={80} style={{ marginBottom: "20px" }} />
    </div>
  );
}

export default ViewInvoiceDetails;
