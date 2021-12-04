import moment from "moment";
import "moment/locale/ar";
import React, { useEffect, useState } from "react";
import { CheckCircle, GeoAltFill, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import style from "./ProjectCard.module.scss";
moment.locale(`${i18n.language}`);
function ProjectCard({ job, jobSaveFunctionally }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(job.is_saved);
  }, [job]);

  const saveJob = () => {
    jobSaveFunctionally(job.id, job.is_saved ? "unsave" : "save");
    setIsSaved(!job.is_saved);
  };

  return (
    <div className={style.serachResult}>
      <Link to={`/${i18n.language}/job-details/${job.id}`}>
        {job.title && <h2>{job.title}</h2>}
      </Link>

      <div className={`${style.pricingUi} clearfix`}>
        <ul>
          <li>
            {/* <Link to='#'>خبير</Link> */}

            {`${job.budget[job.currency].from} - ${
              job.budget[job.currency].to
            } ${job.currency.toUpperCase()}`}
          </li>
          <li>{job.milestone.title}</li>
          <li>
            {job.timeline.title}
            {/* <Link to='#'>سعر ثابت</Link> */}
          </li>
          <li>
            تم النشر {moment.unix(job.published_at).fromNow()}
            {/* <Link to='#'>تم النشر منذ 30 دقيقة</Link> */}
          </li>
        </ul>

        <div
          onClick={() => saveJob()}
          style={{
            cursor: "pointer",
          }}
          className={`${isSaved && style.selected} ${style.heartIcon}`}
        ></div>
      </div>

      {job.description && (
        <p>
          {job.description?.substring(0, 200)}
          {job.description.length >= 200 && "..."}
        </p>
      )}

      {job.skills.length > 0 && (
        <div className={style.tagUi}>
          <ul>
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      <p className={style.bids}>
        عدد العروض :<span> {job.proposals_count}</span>
      </p>

      <div className={style.locationUi}>
        <ul>
          <li className={style.paymentConfirmation}>
            <CheckCircle />
            <span>لم يتم تأكيد الدفع</span>
          </li>
          <li className={style.rating}>
            <StarFill />
            <StarFill />
            <StarFill />
            <StarFill />
            <StarFill />
            5.2
          </li>
          <li className={style.price}>0 $ تم انفاقه</li>
          {job.posted_by.country && (
            <li className="location">
              <GeoAltFill color={"#00c7d4"} />
              <span> {job.posted_by.country} </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProjectCard;
