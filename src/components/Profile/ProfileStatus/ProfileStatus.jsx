import React from "react";
import { Row, Col } from "react-bootstrap";
import { PencilFill, StarFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../ProfileComponents.module.scss";
function ProfileStatus() {
  const profile = useSelector((state) => state.commonData.freelancer);

  return (
    <div className={style.profileContent}>
      <Row>
        <Col lg={4}>
          <h5>
            {profile.title}
            <span>
              <PencilFill />
            </span>
          </h5>
        </Col>

        <Col lg={8}>
          <ul className={style.profileRate}>
            <li>
              <StarFill />
              <span>نسبة النجاح</span>
              <span>
                {`${
                  profile?.success_rate === "0.00" ||
                  profile?.success_rate === undefined
                    ? "Rising Talent"
                    : parseFloat(profile?.success_rate) * 100
                }%`}
              </span>
            </li>
            <li>
              <StarFill />

              <span> نسبة الانجاز</span>

              <span>80%</span>
            </li>
            <li>
              <Link to="#">
                {profile.hourly_rate.amount}
                {profile.hourly_rate.currency}/ hr
              </Link>

              <span>
                <PencilFill />
              </span>
            </li>
          </ul>
        </Col>
      </Row>

      <h2>
        <Link className={style.availableLink} to="#">
          التقنيات المتاحة
          <span>
            <PencilFill />
          </span>
        </Link>
      </h2>

      <p>{profile.about}</p>
    </div>
  );
}

export default ProfileStatus;
