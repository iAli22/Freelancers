import moment from "moment";
import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import style from "./DisputeDetailsModal.module.scss";

function DisputeDetailsModal({ isShow, handleClose, data }) {
  return (
    <>
      {Object.keys(data).length > 0 && (
        <Modal
          show={isShow}
          onHide={() => handleClose(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row className={style.viewContractPop}>
              <Col lg={4}>
                اسم العقد <h3>{data.contract.title}</h3>
              </Col>
              <Col lg={4}>
                الحالة <h3>{data.contract.status}</h3>
              </Col>
              <Col lg={4}>
                {" "}
                رقم النزاع <h2> {data.contract.contract_serial} </h2>
              </Col>
            </Row>

            <Row className={style.viewContractPop}>
              <Col lg={4}>
                قيمة النزاع{" "}
                <h2>
                  {data.amount} {data.currency}
                </h2>
              </Col>
              <Col lg={4}>
                تاريخ الانشاء{" "}
                <h3>{moment(data.created_at * 1000).format("YYYY-MM-DD")}</h3>
              </Col>
              <Col lg={4}> </Col>
            </Row>
            {data.note_to_freelancer && (
              <>
                <hr />
                <p>ملحوظة للفرلانسر</p>
                <h3>{data.note_to_freelancer}</h3>
              </>
            )}
            {data.note_to_client && (
              <>
                <hr />
                <p>ملحوظة للعمليل</p>
                <h3>{data.note_to_client}</h3>
              </>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default DisputeDetailsModal;
