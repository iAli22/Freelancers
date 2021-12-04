import React from "react";
import { Col, Modal, Row, Image } from "react-bootstrap";
import paypalImage from "../../../assets/img/paypal2.svg";
import dollarImage from "../../../assets/img/dollor2.svg";
import style from "./PaymentSwitchModel.module.scss";

function PaymentSwitchModel({
  isShow,
  handleClose,
  handlePaypalModel,
  handleBankModel,
}) {
  return (
    <Modal show={isShow} onHide={() => handleClose(false)} centered>
      <Modal.Header
        closeButton
        className='d-flex justify-content-between'></Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <div
              className={style.modelContainer}
              onClick={() => {
                handlePaypalModel(true);
                handleClose(false);
              }}>
              <Image src={paypalImage} alt='paypal' />
              <p>Paypal</p>
            </div>
          </Col>
          <Col lg={6}>
            <div
              className={style.modelContainer}
              onClick={() => {
                handleBankModel(true);
                handleClose(false);
              }}>
              <Image src={dollarImage} alt='Bank' />
              <p>Bank</p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentSwitchModel;
