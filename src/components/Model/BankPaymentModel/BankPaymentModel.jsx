import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import BankImage from "../../../assets/img/dollor2.svg";
import { errorToast, successToast } from "../../../helper/toastMessage";
import {
  addPaymentMethod,
  updatePayment,
} from "../../../redux/actions/userAction";
import style from "./BankPaymentModel.module.scss";

function BankPaymentModel({ isShow, handleClose, getRecentAdded, editData }) {
  const dispatch = useDispatch();
  const changePasswordSchema = Yup.object({
    bank_id_bic: Yup.string()
      .matches(/[0-9]+/, "Bank ID must be a number")
      .required("Bank ID is required"),
    account_id: Yup.string()
      .matches(/[0-9]+/, "Account No. must be a number")
      .required("Account No. is required"),
    name: Yup.string().required("Name is required"),
    payout_beneficiary_address_1: Yup.string().required(
      "Address 1 is required"
    ),
    payout_beneficiary_address_2: Yup.string().required(
      "Address 2 is required"
    ),
    payout_beneficiary_address_3: Yup.string().required(
      "Address 3 is required"
    ),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      bank_id_bic: editData.bank_id_bic,
      account_id: editData.account_id,
      name: editData.name,
      payout_beneficiary_address_1: editData.payout_beneficiary_address_1,
      payout_beneficiary_address_2: editData.payout_beneficiary_address_2,
      payout_beneficiary_address_3: editData.payout_beneficiary_address_3,
    },
  });

  const onDataSubmit = (data) => {
    if (!editData.id) {
      dispatch(
        addPaymentMethod({
          ...data,
          transfer_currency: "sar",
          type: "account",
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
      dispatch(
        updatePayment(editData.id, {
          ...data,
          transfer_currency: "sar",
          type: "account",
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
    <Modal show={isShow} onHide={() => handleClose(false)} centered size="lg">
      <form onSubmit={handleSubmit(onDataSubmit)}>
        <Modal.Header closeButton className="d-flex justify-content-between">
          <Modal.Title className={`w-100 ${style.modelTitle}`}>
            <Image src={BankImage} alt="Bank" />
            اضافة بيانات دفع
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <label htmlFor="name">الاسم الثلاثى</label>
              <div
                className={`${style.inputContainer} ${
                  errors.name && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={value || ""}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.name && (
                <span className={style.errors}>{errors.name.message}</span>
              )}
            </Col>
            <Col lg={6}>
              <label htmlFor="bank_id_bic">الرقم التعريفى للبنك</label>
              <div
                className={`${style.inputContainer} ${
                  errors.bank_id_bic && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="bank_id_bic"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type="text"
                        name="bank_id_bic"
                        id="bank_id_bic"
                        onChange={onChange}
                        value={value || ""}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.bank_id_bic && (
                <span className={style.errors}>
                  {errors.bank_id_bic.message}
                </span>
              )}
            </Col>
            <Col lg={6}>
              <label htmlFor="account_id">رقم الحساب</label>
              <div
                className={`${style.inputContainer} ${
                  errors.account_id && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="account_id"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type="text"
                        name="account_id"
                        id="account_id"
                        onChange={onChange}
                        value={value || ""}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.account_id && (
                <span className={style.errors}>
                  {errors.account_id.message}
                </span>
              )}
            </Col>
            <Col lg={12}>
              <label htmlFor="payout_beneficiary_address_1">
                العنوان الاول
              </label>
              <div
                className={`${style.inputContainer} ${
                  errors.payout_beneficiary_address_1 && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="payout_beneficiary_address_1"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type="text"
                        name="payout_beneficiary_address_1"
                        id="payout_beneficiary_address_1"
                        onChange={onChange}
                        value={value || ""}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.payout_beneficiary_address_1 && (
                <span className={style.errors}>
                  {errors.payout_beneficiary_address_1.message}
                </span>
              )}
            </Col>
            <Col lg={12}>
              <label htmlFor="payout_beneficiary_address_2">
                العنوان الثانى
              </label>
              <div
                className={`${style.inputContainer} ${
                  errors.payout_beneficiary_address_2 && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="payout_beneficiary_address_2"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type="text"
                        name="payout_beneficiary_address_2"
                        id="payout_beneficiary_address_2"
                        onChange={onChange}
                        value={value || ""}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.payout_beneficiary_address_2 && (
                <span className={style.errors}>
                  {errors.payout_beneficiary_address_2.message}
                </span>
              )}
            </Col>
            <Col lg={12}>
              <label htmlFor="payout_beneficiary_address_3">
                العنوان الثالث
              </label>
              <div
                className={`${style.inputContainer} ${
                  errors.payout_beneficiary_address_3 && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="payout_beneficiary_address_3"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type="text"
                        name="payout_beneficiary_address_3"
                        id="payout_beneficiary_address_3"
                        onChange={onChange}
                        value={value || ""}
                      />
                    </div>
                  )}
                />
              </div>

              {errors.payout_beneficiary_address_3 && (
                <span className={style.errors}>
                  {errors.payout_beneficiary_address_3.message}
                </span>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className={style.footer}>
          <Button
            variant="primary"
            className={`btn-primary ${style.presentation}`}
            type="submit"
          >
            حفظ
          </Button>
          <Button
            variant="primary"
            className={`btn-primary ${style.cancel}`}
            onClick={() => handleClose(false)}
            type="button"
          >
            الغاء
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default BankPaymentModel;
