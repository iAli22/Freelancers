import moment from "moment";
import React, { useState } from "react";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Attachments } from "../..";
import { errorToast, successToast } from "../../../helper/toastMessage";
import { submitForPayment } from "../../../redux/actions/userAction";
import style from "./SubmitForPaymentModal.module.scss";

function SubmitForPayment({
  isShow,
  handleClose,
  milestone,
  isReadOnly,
  setIsModalSubmitted,
}) {
  moment.locale(`en`);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const [removedFiles, setRemovedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);

  const getFiles = (files) => {
    setFiles(files);
  };
  const getDeletedId = (id) => {
    if (id) {
      setRemovedFiles((prev) => [...prev, id]);
    }
  };

  const onHandleSubmit = (data) => {
    setSubmitting(true);
    let formData = new FormData();
    formData.append("message", data.description);
    formData.append("milestone_id", milestone.id);

    files.length !== 0 &&
      files.map((file, i) => {
        if (!file.id) {
          formData.append("files[]", file, file.name);
        }
        return null;
      });

    dispatch(submitForPayment(id, formData))
      .then((res) => {
        setSubmitting(false);
        handleClose(false);
        successToast(res.data.message);
        setIsModalSubmitted(true);
      })
      .catch((error) => {
        errorToast(error.message);
        setSubmitting(false);
      });
  };
  return (
    <Modal show={isShow} onHide={() => handleClose(false)} centered size="lg">
      <Modal.Header closeButton className="d-flex justify-content-between ">
        <Modal.Title className={`w-100 ${style.modelTitle}`}>
          قدم عملك او اطلب الدفع لهذه الدفعة
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className={style.offerContent}>
            <div className={style.offerContentTitle}>
              {!isReadOnly && (
                <p>
                  استخدم هذا الطلب لكي تطلب موافقة علي العمل الذي أنجزته وسيتم
                  تحويل الأموال بمجرد الحصول علي الموافقة
                </p>
              )}
            </div>
          </div>

          <div className={style.offerContent}>
            <div className="offer-content-title">
              <h2>مدفوعات الدفعة</h2>
            </div>

            <Row>
              <Col lg={4} className={` ${errors.name ? style.errors : ""} `}>
                <label htmlFor="nameLabel">اسم الدفعة</label>

                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="text"
                      name="name"
                      id="nameLabel"
                      onChange={onChange}
                      value={milestone?.title}
                      className={style.expiation}
                      readOnly
                    />
                  )}
                />

                {errors.name && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>

              <Col lg={4}>
                <label htmlFor="price_currencyLabel">الكمية</label>
                <div
                  className={`${style.inputContainer} ${
                    errors.price_value ? style.errors : ""
                  } `}
                >
                  <div className={style.inputLabel}> بالريال</div>
                  <Controller
                    control={control}
                    name="price_value"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="number"
                        name="price_value"
                        id="price_currencyLabel"
                        value={milestone?.amount}
                        readOnly
                      />
                    )}
                  />
                </div>
                {errors.price_value && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
              <Col
                lg={4}
                className={` ${errors.due_date ? style.errors : ""} `}
              >
                <label htmlFor="due_dateLabe">التاريخ المستحق</label>

                <Controller
                  control={control}
                  name="due_date"
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="date"
                      className={`${style.formControl} form-control ${
                        errors.due_date ? style.completeBorder : ""
                      }`}
                      id="due_dateLabe"
                      name="due_date"
                      onChange={onChange}
                      value={moment(milestone.due_date * 1000).format(
                        "YYYY-MM-DD"
                      )}
                      readOnly
                    />
                  )}
                />
                {errors.due_date && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
            </Row>
          </div>

          <div className={style.offerContent}>
            <Row>
              <Col
                lg={12}
                className={` ${errors.description ? style.errors : ""} `}
              >
                <label htmlFor="descriptionLabel"> الرسالة </label>
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      className={`${style.formControl} form-control`}
                      id="noteLabel"
                      rows="5"
                      name="description"
                      onChange={onChange}
                      value={value || milestone.freelancer_message}
                      readOnly={isReadOnly}
                    />
                  )}
                />

                {errors.description && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
            </Row>

            {!isReadOnly && (
              <span>يفضل ارفاق ملفات العمل , لو لم تقدمه من قبل</span>
            )}
            <Attachments
              getFiles={getFiles}
              data={milestone.freelancer_submitted_files}
              getDeletedId={getDeletedId}
              readOnly={isReadOnly}
            />
          </div>

          <Row>
            <Col lg={3}></Col>
            <Col lg={3}>
              <button
                type="submit"
                className={`btn btn-primary ${style.presentation}`}
                disabled={isReadOnly}
              >
                {submitting ? (
                  <Spinner animation="grow" size="sm" />
                ) : (
                  " تقديم العرض"
                )}
              </button>
            </Col>
            <Col lg={3}>
              <button
                type="submit"
                className={`btn btn-primary ${style.cancel}`}
                onClick={() => handleClose(false)}
              >
                الغاء
              </button>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SubmitForPayment;
