import React, { useEffect, useState } from "react";
import { ThreeDots, PlusCircleFill } from "react-bootstrap-icons";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import DollarImage from "../../../assets/icons/dollor.svg";
import PaypalImage from "../../../assets/icons/paypal.svg";
import EmptyImage from "../../../assets/img/noDataFound.png";
import { errorToast, successToast } from "../../../helper/toastMessage";
import {
  PaymentSwitchModel,
  PaypalPaymentModel,
  BankPaymentModel,
  CardsSkeleton,
} from "../../../components";
import style from "./PaymentOptions.module.scss";
import { useDispatch } from "react-redux";
import {
  getPaymentSettings,
  makeDefaultPayment,
  deletePayment,
} from "../../../redux/actions/userAction.js";

function PaymentOptions() {
  const dispatch = useDispatch();
  const [paymentSetting, setPaymentSetting] = useState(null);
  const [showPaymentSwitch, setShowPaymentSwitch] = useState(false);
  const [showPaypalModel, setShowPaypalModel] = useState(false);
  const [showBankModel, setShowBankModel] = useState(false);
  const [editData, setEditData] = useState([]);

  useEffect(() => {
    dispatch(getPaymentSettings()).then((res) =>
      setPaymentSetting(res.data.data.beneficiary)
    );
  }, [dispatch]);

  const deletePaymentMethod = (id) => {
    dispatch(deletePayment(id))
      .then((res) => {
        let newPaymentSetting = paymentSetting.filter((item) => item.id !== id);
        setPaymentSetting(newPaymentSetting);
        successToast(res.data.message);
      })
      .catch((error) => errorToast(error.message));
  };

  const setDefaultPaymentMethod = (id) => {
    dispatch(makeDefaultPayment(id))
      .then((res) => {
        let newPaymentSetting = [...paymentSetting];
        newPaymentSetting.map((item, index) =>
          item.id === id
            ? (newPaymentSetting[index].is_default = true)
            : (newPaymentSetting[index].is_default = false)
        );
        setPaymentSetting(newPaymentSetting);
        successToast(res.data.message);
      })
      .catch((error) => errorToast(error.message));
  };

  const editPaymentMethod = (item) => {
    if (item.type === "paypal") {
      setShowPaypalModel(true);
      setEditData(item);
    } else if (item.type === "account") {
      setShowBankModel(true);
      setEditData(item);
    }
  };

  const getRecentAdded = (newItem) => {
    //  check if item exist
    let isEdit = paymentSetting.find((item) => item.id === newItem.id);
    if (!isEdit) {
      // Add New
      setPaymentSetting((prev) => {
        return [...prev, newItem];
      });
    } else {
      // edit existent item
      let editedItems = paymentSetting.map((item) =>
        item.id === newItem.id ? { ...newItem } : item
      );
      setPaymentSetting(editedItems);
    }
  };
  return (
    <>
      <Row style={{ width: "100%" }}>
        <PaymentSwitchModel
          isShow={showPaymentSwitch}
          handleClose={(e) => setShowPaymentSwitch(e)}
          handlePaypalModel={(e) => setShowPaypalModel(e)}
          handleBankModel={(e) => setShowBankModel(e)}
        />
        {showPaypalModel && (
          <PaypalPaymentModel
            isShow={showPaypalModel}
            handleClose={(e) => {
              setShowPaypalModel(e);
              setEditData([]);
            }}
            getRecentAdded={getRecentAdded}
            editData={editData}
          />
        )}
        {showBankModel && (
          <BankPaymentModel
            isShow={showBankModel}
            handleClose={(e) => {
              setShowBankModel(e);
              setEditData([]);
            }}
            getRecentAdded={getRecentAdded}
            editData={editData}
          />
        )}
        <Col lg={9}></Col>
        <Col lg={3}>
          <button
            onClick={() => setShowPaymentSwitch(true)}
            type='button'
            className={`btn btn-primary ${style.changeTerms}`}>
            <PlusCircleFill /> إضافة حساب
          </button>
        </Col>
      </Row>

      <Row className={`${style.portfolioContainer} my-3`}>
        {paymentSetting === null ? (
          <>
            {[...Array(3)].map((item, index) => (
              <div key={index}>
                <CardsSkeleton height={120} style={{ marginBottom: "20px" }} />
              </div>
            ))}
          </>
        ) : (
          paymentSetting.map((item) => (
            <Row
              key={item.id}
              className={`${style.contactsDetails} ${style.portfolioItem}`}
              data-bs-toggle='modal'
              data-bs-target='#exampleModal1'>
              <ul>
                <li className='col-lg-3'>
                  <h2>
                    <span>
                      <img
                        src={
                          item.type === "account" ? DollarImage : PaypalImage
                        }
                        alt='Icon'
                      />
                      {item.is_default && <b>الحساب الرئيسي</b>}
                    </span>
                    {item.type === "account" ? item.name : item.ppl_receiver}
                  </h2>
                </li>
                <li className='col-lg-2'>
                  {item.type === "account" && item.account_id}
                </li>
                <li className='col-lg-2'>
                  {item.type === "account" && item.bank_id_bic}
                </li>
                <li className='col-lg-1'>
                  {item.type === "account" && item.payout_beneficiary_address_1}
                </li>
                <li className='col-lg-2'>
                  {item.type === "account" && item.payout_beneficiary_address_2}
                </li>

                <li className='col-lg-1'>
                  <Dropdown>
                    <Dropdown.Toggle variant='white' id={item.id}>
                      <ThreeDots />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          editPaymentMethod(item);
                        }}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          deletePaymentMethod(item.id);
                        }}>
                        Delete
                      </Dropdown.Item>
                      {!item.is_default && (
                        <Dropdown.Item
                          onClick={() => {
                            setDefaultPaymentMethod(item.id);
                          }}>
                          Default
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Row>
          ))
        )}
        {paymentSetting?.length === 0 && (
          <div className='text-center h-100'>
            <Image src={EmptyImage} alt='empty' />
            <p>There is No Payment Methods in This Tab</p>
          </div>
        )}
      </Row>
    </>
  );
}

export default PaymentOptions;
