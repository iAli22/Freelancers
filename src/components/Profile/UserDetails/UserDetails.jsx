import moment from "moment";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { GeoAltFill, PencilFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Star } from "../..";
import style from "./UserDetails.module.scss";
function UserDetails() {
  const profile = useSelector((state) => state.commonData.freelancer);
  return (
    <div className={style.userDetail}>
      <Row>
        <Col lg={1}>
          <ul className={style.userDetailUl}>
            <li className={style.userAvtar}>
              <Image src={profile.profile_image} alt="User" />
              <span></span>
            </li>
          </ul>
        </Col>
        <Col lg={7}>
          <ul className={style.userDetailUl}>
            <li className={style.userName}>
              {profile.first_name} {profile.last_name}
              <span>
                <PencilFill />
              </span>
            </li>

            <li>
              <Star rate={profile.rating} />

              <span> {profile.rating}</span>
            </li>
            <li>{moment.unix(profile.created_at).fromNow()}</li>
          </ul>
          <ul className={style.userLocation}>
            <li>
              <GeoAltFill />
              {profile.country}
              <span>
                <PencilFill />
              </span>
            </li>
          </ul>
        </Col>
        <Col lg={4}>
          <ul className={style.profileSettingUl}>
            <li>
              <button
                type="button"
                className={`btn btn-primary ${style.viewProfile}`}
              >
                شاهد ملفك الشخصي العام{" "}
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn btn-primary ${style.profileSetting}`}
              >
                اعدادات الملف الشخصي
              </button>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default UserDetails;
