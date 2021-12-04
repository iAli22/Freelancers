import React from "react";
import { PencilFill, PlusCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import style from "./UserAvailability.module.scss";
import { useSelector } from "react-redux";
function UserAvailability() {
  const profile = useSelector((state) => state.commonData.freelancer);

  return (
    <>
      {/* <div className={style.userAvailability}>
        <div className={style.available}>
          <h4>
            الاتاحة
            <span>
              <PencilFill />
            </span>
          </h4>
          <p>متاح - حسب الطلب</p>
        </div>
      </div> */}
      <div className={style.userAvailability}>
        <div className={style.experience}>
          <h4>
            الخبرات
            <span>
              <PencilFill />
            </span>
            <span>
              <PlusCircleFill />
            </span>
          </h4>

          {profile.categories.length > 0 && (
            <ul>
              {profile.categories.map((skill, idx) => (
                <li key={idx}>
                  <Link to="/#"> {skill.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>{" "}
      <div className={style.userAvailability}>
        <div className={style.experience}>
          <h4>
            اللغات المستخدمة
            <span>
              <PencilFill />
            </span>
            <span>
              <PlusCircleFill />
            </span>
          </h4>

          <ul className={style.language}>
            {profile.known_languages && (
              <>
                {profile.known_languages.map((item, idx) => (
                  <li key={idx}> {item}</li>
                ))}
              </>
            )}
          </ul>
        </div>

        <div className={style.experience}>
          <h4>
            التعليم
            <span>
              <PencilFill />
            </span>
            <span>
              <PlusCircleFill />
            </span>
          </h4>

          <ul className={style.language}>
            {profile.educations && (
              <>
                {profile.educations.map((item, idx) => (
                  <div key={idx}>
                    <li> {item.school_name}</li>
                    <li>
                      {item.date_from} / {item.date_to}
                    </li>
                  </div>
                ))}
              </>
            )}

            <li></li>
          </ul>
        </div>
      </div>
      <div className={style.userAvailability}>
        <div className={style.experience}>
          <h4>
            المهارات
            <span>
              <PencilFill />
            </span>
            <span>
              <PlusCircleFill />
            </span>{" "}
          </h4>

          {profile.skills.length > 0 && (
            <ul>
              {profile.skills.map((skill, idx) => (
                <li key={idx}>
                  <Link to="/#"> {skill}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default UserAvailability;
