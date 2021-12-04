import React, { useState, useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Attachments } from "../..";
import style from "./JobDetails.module.scss";
import { successToast } from "../../../helper/toastMessage";
import { saveJob } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

function JobDetails({ job }) {
  const { i18n } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (job) {
      setIsSaved(job?.is_saved);
    }
  }, [job]);

  const jobSaveFunctionally = (id, type) => {
    dispatch(saveJob(id, type)).then((res) => {
      successToast(res.data.message);
      setIsSaved((prev) => !prev);
    });
  };
  return (
    <div className={`${style.offerContent}  ${style.mobileAppDesign}`}>
      <div className={style.offerContentTitle}>
        <h3>
          {job.title}
          <span>
            <i className="bi bi-clock"></i>
            تم نشره {moment.unix(job.published_at).fromNow()}
          </span>
        </h3>
        <div
          onClick={() =>
            jobSaveFunctionally(job.id, isSaved ? "unsave" : "save")
          }
          style={{
            cursor: "pointer",
          }}
          className={`${isSaved && style.selected} ${style.heartIcon}`}
        ></div>
      </div>

      <p className="my-3">{job.description}</p>

      <h2>تفاصيل المشروع</h2>

      <div className="row">
        <div className="col-lg-4">
          <p>
            الميزانية <br />
            {job.budget.sar.to} {job.currency}
          </p>
        </div>
        <div className="col-lg-4">
          <p>
            {" "}
            مدة المشروع
            <br />
            {job.timeline.title}
          </p>
        </div>
        <div className="col-lg-4">
          <p>
            {" "}
            نوع المشروع
            <br />
            {job.milestone.title}
          </p>
        </div>
      </div>

      {job.skills.length > 0 && (
        <>
          <h2>المهارات والخبرات</h2>

          <div className={style.experience}>
            <ul>
              {job.skills.map((skill, index) => (
                <li key={index}>
                  <Link to="#">{skill}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <h2>المرفقات</h2>
      <Attachments data={job.files} readOnly />

      <div className={style.detailBtn}>
        <Link to={`/${i18n.language}/submit-proposal/${job.id}`}>
          <button
            type="submit"
            className={`btn btn-primary ${style.detailBtn}`}
          >
            تقديم العرض
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobDetails;
