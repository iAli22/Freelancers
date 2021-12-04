import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Attachments, CardsSkeleton } from "../..";
import { errorToast, successToast } from "../../../helper/toastMessage";

import { useDispatch } from "react-redux";
import style from "./SubmitProposalForm.module.scss";
import moment from "moment";
import {
  createProposal,
  proposalDetails,
  updateProposal,
  jobDetails,
} from "../../../redux/actions/userAction";
import { useTranslation } from "react-i18next";

function SubmitProposalForm({ getClientInfo }) {
  moment.locale(`en`);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { id, actionType } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [proposalData, setProposalData] = useState({});
  const [removedFiles, setRemovedFiles] = useState([]);
  const [amount, setQuantity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const { i18n } = useTranslation();
  const mounted = useRef();

  const getFiles = (files) => {
    setFiles(files);
  };
  const getDeletedId = (id) => {
    if (id) {
      setRemovedFiles((prev) => [...prev, id]);
    }
  };
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (actionType === "edit") {
        dispatch(proposalDetails(id)).then((res) => {
          // Set Values to Inputs on Edit Mode
          const { period, price, milestones, files, descripiton } =
            res.data.data.proposal;
          setValue("period", Number(period));
          setValue("price_value", Number(price));
          setQuantity(+price);
          setValue("description", descripiton);
          setValue(
            "due_date",
            moment(milestones[0].due_date * 1000).format("YYYY-MM-DD")
          );
          setValue("note", milestones[0].note);
          setValue("name", milestones[0].name);

          setFiles(files);
          setProposalData(res.data.data.proposal);
          getClientInfo(res.data.data.proposal.project);
        });
      } else {
        dispatch(jobDetails(id))
          .then((res) => {
            getClientInfo(res.data.data.job);
          })
          .catch((err) => console.log(`err`, err));
      }
    }
  }, [dispatch, id, actionType, setValue, getClientInfo]);

  const onHandleSubmit = (data) => {
    setSubmitting(true);
    let formData = new FormData();
    formData.append("period", parseInt(data.period));
    formData.append("price_currency", "sar");
    formData.append("price_value", data.price_value);
    formData.append("description", data.description);

    if (removedFiles.length >= 0) {
      formData.append("file_ids_to_delete", JSON.stringify(removedFiles));
    }
    formData.append("publish_now", 1);
    files.length !== 0 &&
      files.map((file, i) => {
        if (!file.id) {
          formData.append("files[]", file, file.name);
        }
        return null;
      });
    formData.append(
      "milestones",
      JSON.stringify([
        {
          name: data.name,
          amount: parseFloat(amount).toFixed(2),
          due_date: moment(data.due_date).format("X"),
          note: data.note,
        },
      ])
    );

    if (actionType === "edit") {
      dispatch(updateProposal(id, formData))
        .then((res) => {
          setSubmitting(false);
          history.push(
            `/${i18n.language}/show-proposal/${res.data.data.proposal.id}`
          );
          successToast(res.data.message);
        })
        .catch((error) => {
          errorToast(error?.message);
          setSubmitting(false);
        });
    } else {
      dispatch(createProposal(id, formData))
        .then((res) => {
          setSubmitting(false);
          history.push(
            `/${i18n.language}/show-proposal/${res.data.data.proposal.id}`
          );
          successToast(res.data.message);
        })
        .catch((error) => {
          errorToast(error?.message);
          // console.log("error.message :>> ", error.message);
          setSubmitting(false);
        });
    }
  };

  return (
    /**
     *  if there is edit > show skeleton
     */
    <>
      {actionType === "edit" && Object.keys(proposalData).length === 0 ? (
        <div>
          <CardsSkeleton height={40} style={{ marginBottom: "20px" }} />
          <CardsSkeleton height={200} style={{ marginBottom: "20px" }} />
          <CardsSkeleton height={200} style={{ marginBottom: "20px" }} />
          <CardsSkeleton height={200} style={{ marginBottom: "20px" }} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <h5>تقديم عرض</h5>
          <div className={style.offerContent}>
            <div className={style.offerContentTitle}>
              <h2>الشروط والأحكام</h2>
            </div>

            <Row>
              <Col lg={4}>
                <label htmlFor="periodLabel">
                  الفترة الزمنية
                  <span>( المدة المتوقعة لانهاء المشروع بالايام )</span>
                </label>
                <div
                  className={`${style.inputContainer} ${
                    errors.period ? style.errors : null
                  } `}
                >
                  <div className={style.inputLabel}>الأيام</div>
                  <Controller
                    control={control}
                    name="period"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="number"
                        name="period"
                        id="periodLabel"
                        onChange={onChange}
                        value={value || ""}
                      />
                    )}
                  />
                </div>

                {errors.period && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
              <Col lg={4}>
                <label htmlFor="price_currencyLabel">
                  السعر
                  <span>( سيتم دفعه من قبل مالك المشروع )</span>
                </label>
                <div
                  className={`${style.inputContainer} ${
                    errors.price_value ? style.errors : ""
                  } `}
                >
                  <div className={style.inputLabel}> بالريال</div>
                  <Controller
                    control={control}
                    name="price_value"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="number"
                        name="price_value"
                        id="price_currencyLabel"
                        onChange={(e) => {
                          onChange(e);
                          setQuantity(e.target.value);
                        }}
                        value={value || ""}
                      />
                    )}
                  />
                </div>
                {errors.price_value && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
            </Row>
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
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="text"
                      name="name"
                      id="nameLabel"
                      onChange={onChange}
                      value={value || ""}
                    />
                  )}
                />

                {errors.name && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>

              <Col lg={4}>
                <label htmlFor="amountLabel">الكمية</label>
                <div
                  className={`${style.inputContainer} ${
                    errors.price_value ? style.errors : ""
                  } `}
                >
                  <div className={style.inputLabel}>بالريال</div>
                  <input
                    type="number"
                    name="amount"
                    id="amountLabel"
                    value={amount}
                    readOnly
                  />
                </div>
              </Col>

              <Col
                lg={4}
                className={` ${errors.due_date ? style.errors : ""} `}
              >
                <label htmlFor="due_dateLabe">التاريخ المستحق</label>

                <Controller
                  control={control}
                  name="due_date"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="date"
                      className={`${style.formControl} form-control ${
                        errors.due_date ? style.completeBorder : ""
                      }`}
                      id="due_dateLabe"
                      name="due_date"
                      onChange={onChange}
                      value={value || ""}
                    />
                  )}
                />
                {errors.due_date && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={12} className={` ${errors.note ? style.errors : ""} `}>
                <label htmlFor="noteLabel">
                  الوصف <span>( اختياري )</span>
                </label>
                <Controller
                  control={control}
                  name="note"
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      className={`${style.formControl} form-control`}
                      id="noteLabel"
                      rows="5"
                      name="note"
                      onChange={onChange}
                      value={value || ""}
                    />
                  )}
                />
              </Col>
            </Row>
          </div>

          <div className={style.offerContent}>
            <Row>
              <Col
                lg={12}
                className={` ${errors.description ? style.errors : ""} `}
              >
                <label htmlFor="descriptionLabel"> مختصر </label>
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
                      value={value || ""}
                    />
                  )}
                />

                {errors.description && (
                  <span className={style.errors}>This field is required</span>
                )}
              </Col>
            </Row>

            <Attachments
              getFiles={getFiles}
              data={files}
              getDeletedId={getDeletedId}
            />
          </div>

          <Row>
            <Col lg={3}></Col>
            <Col lg={3}>
              <button
                type="submit"
                className={`btn btn-primary ${style.presentation}`}
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
              >
                الغاء
              </button>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </form>
      )}
    </>
  );
}

export default SubmitProposalForm;
