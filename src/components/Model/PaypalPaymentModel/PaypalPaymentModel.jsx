import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Modal, Row, Image } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { errorToast, successToast } from "../../../helper/toastMessage";
import {
  addPaymentMethod,
  updatePayment,
} from "../../../redux/actions/userAction";
import paypalImage from "../../../assets/img/paypal2.svg";
import style from "./PaypalPaymentModel.module.scss";

function PaypalPaymentModel({ isShow, handleClose, getRecentAdded, editData }) {
  const dispatch = useDispatch();
  const [paypalType, setPaylpalType] = useState("EMAIL");
  const changePasswordSchema = Yup.object({
    ...(paypalType === "EMAIL" && {
      EMAIL: Yup.string()
        .email("Email must be a valid email")
        .required("Email is required"),
    }),
    ...(paypalType === "PHONE" && {
      PHONE: Yup.string()
        .matches(/[0-9]+/, "Phone must be a number")
        .required("Phone number is required"),
    }),
    ...(paypalType === "PAYPAL_ID" && {
      PAYPAL_ID: Yup.string().required("Paypal id is required"),
    }),
  });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      ...(editData.ppl_recipient_type === "EMAIL" && {
        EMAIL: editData.ppl_receiver,
      }),
      ...(editData.ppl_recipient_type === "PHONE" && {
        PHONE: editData.ppl_receiver,
      }),
      ...(editData.ppl_recipient_type === "PAYPAL_ID" && {
        PAYPAL_ID: editData.ppl_receiver,
      }),
    },
  });

  useEffect(() => {
    if (editData.id) {
      setPaylpalType(editData.ppl_recipient_type);
    } else {
    }
  }, [editData]);

  const onDataSubmit = (data) => {
    if (!editData.id) {
      // Add New
      let validData = Object.values(data).filter(
        (item) => item !== undefined
      )[0];
      dispatch(
        addPaymentMethod({
          name: paypalType,
          ppl_receiver: validData,
          ppl_recipient_type: paypalType,
          type: "paypal",
        })
      )
        .then((res) => {
          successToast(res.data.message);
          handleClose(false);
          getRecentAdded(res.data.data.beneficiary);
        })
        .catch((error) => {
          errorToast(error.message);
          handleClose(false);
        });
    } else {
      // Edit
      let validData = Object.values(data).filter(
        (item) => item !== undefined
      )[0];
      dispatch(
        updatePayment(editData.id, {
          name: paypalType,
          ppl_receiver: validData,
          ppl_recipient_type: paypalType,
          type: "paypal",
        })
      )
        .then((res) => {
          successToast(res.data.message);
          handleClose(false);
          getRecentAdded(res.data.data.beneficiary);
        })
        .catch((error) => {
          errorToast(error.message);
          handleClose(false);
        });
    }
  };
  return (
    <Modal show={isShow} onHide={() => handleClose(false)} centered>
      <form onSubmit={handleSubmit(onDataSubmit)}>
        <Modal.Header closeButton className='d-flex justify-content-between'>
          <Modal.Title className={`w-100 ${style.modelTitle}`}>
            <Image src={paypalImage} alt='paypal' />
            اضافة بيانات دفع
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.buttonsContainer}>
            <Button
              className={paypalType === "EMAIL" && style.active}
              onClick={() => {
                setPaylpalType("EMAIL");
                setValue("PHONE", undefined);
                setValue("PAYPAL_ID", undefined);
              }}>
              البريد الالكترونى
            </Button>
            <Button
              className={paypalType === "PHONE" && style.active}
              onClick={() => {
                setPaylpalType("PHONE");
                setValue("EMAIL", undefined);
                setValue("PAYPAL_ID", undefined);
              }}>
              الهاتف المحمول
            </Button>
            <Button
              className={paypalType === "PAYPAL_ID" && style.active}
              onClick={() => {
                setPaylpalType("PAYPAL_ID");
                setValue("PHONE", undefined);
                setValue("EMAIL", undefined);
              }}>
              رقم الباى بال التعريفى
            </Button>
          </div>
          <Row>
            {paypalType === "EMAIL" && (
              <Col lg={12}>
                <label htmlFor='EMAIL'>البريد الالكترونى</label>
                <div
                  className={`${style.inputContainer} ${
                    errors.EMAIL && style.errors
                  } `}>
                  <Controller
                    control={control}
                    name='EMAIL'
                    render={({ field: { onChange, value } }) => (
                      <div className={style.passwordContainer}>
                        <input
                          type='text'
                          name='EMAIL'
                          id='EMAIL'
                          onChange={onChange}
                          value={value || ""}
                        />
                      </div>
                    )}
                  />
                </div>

                {errors.EMAIL && (
                  <span className={style.errors}>{errors.EMAIL.message}</span>
                )}
              </Col>
            )}
            {paypalType === "PHONE" && (
              <Col lg={12}>
                <label htmlFor='PHONE'>رقم الهاتف</label>
                <div
                  className={`${style.inputContainer} ${
                    errors.PHONE && style.errors
                  } `}>
                  <Controller
                    control={control}
                    name='PHONE'
                    render={({ field: { onChange, value } }) => (
                      <div className={style.passwordContainer}>
                        <input
                          type='text'
                          name='PHONE'
                          id='PHONE'
                          onChange={onChange}
                          value={value || ""}
                        />
                      </div>
                    )}
                  />
                </div>

                {errors.PHONE && (
                  <span className={style.errors}>{errors.PHONE.message}</span>
                )}
              </Col>
            )}
            {paypalType === "PAYPAL_ID" && (
              <Col lg={12}>
                <label htmlFor='PAYPAL_ID'>رقم باى بال التعريفى</label>
                <div
                  className={`${style.inputContainer} ${
                    errors.PAYPAL_ID && style.errors
                  } `}>
                  <Controller
                    control={control}
                    name='PAYPAL_ID'
                    render={({ field: { onChange, value } }) => (
                      <div className={style.passwordContainer}>
                        <input
                          type='text'
                          name='PAYPAL_ID'
                          id='PAYPAL_ID'
                          onChange={onChange}
                          value={value || ""}
                        />
                      </div>
                    )}
                  />
                </div>

                {errors.PAYPAL_ID && (
                  <span className={style.errors}>
                    {errors.PAYPAL_ID.message}
                  </span>
                )}
              </Col>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer className={style.footer}>
          <Button
            variant='primary'
            className={`btn-primary ${style.presentation}`}
            type='submit'>
            حفظ
          </Button>
          <Button
            variant='primary'
            className={`btn-primary ${style.cancel}`}
            onClick={() => handleClose(false)}
            type='button'>
            الغاء
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default PaypalPaymentModel;
