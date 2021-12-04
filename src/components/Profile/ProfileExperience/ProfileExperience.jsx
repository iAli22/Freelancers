import React from "react";
import style from "../ProfileComponents.module.scss";
import { PlusCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import circle from "../../../assets/icons/circle.svg";

function ProfileExperience() {
  const profile = useSelector((state) => state.commonData.freelancer);

  return (
    <div className={style.profileContent}>
      <h5>
        الوظائف السابقة
        <span>
          <PlusCircleFill />
        </span>
      </h5>

      {profile.employments.length > 0 ? (
        <>
          {profile.employments.map((employment) => (
            <div className={style.profileBox__details} key={employment.id}>
              <h2>
                <Link className={style.availableLink} to='#'>
                  {employment.company_name}
                </Link>
              </h2>

              <h4> {employment.country}</h4>
              <h4>
                {employment.from_month_year} |{" "}
                {employment.currently_working ? (
                  <span>Present</span>
                ) : (
                  <span>: {employment.to_month_year}</span>
                )}
              </h4>
              <p>{employment.description}</p>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <div className={style.profilGallery}>
          <Image fluid src={circle} alt='Icon' />
          <p>اعرض للعالم مهاراتك وقوتك واظهر ملكاتك بكل قوة</p>
        </div>
      )}
    </div>
  );
}

export default ProfileExperience;
