import moment from "moment";
import React from "react";
import { Image } from "react-bootstrap";
import femaleImage from "../../../assets/img/female1.png";
import maleImage from "../../../assets/img/male1.png";

import { GeoAltFill } from "react-bootstrap-icons";
import style from "./JobClientInfo.module.scss";
function JobClientInfo({ client }) {
  return (
    <div className={style.offerProfile}>
      <Image
        src={
          client?.profile_image
            ? client?.profile_image
            : client?.gender === "female"
            ? femaleImage
            : maleImage
        }
        fluid
        className={style.userProfile}
        alt="Image"
      />

      <h3>
        {client.name}
        <span>عضو {moment.unix(client.created_at).fromNow()}</span>
        <span>
          <GeoAltFill />
          <i className="bi bi-geo-alt-fill"></i>
          {client.country}
        </span>
      </h3>

      <p className={style.projectPercent}>
        نسبة التوظيف
        <span>{client.hiring_rate}% </span>
      </p>
      <p className={style.projectPercent}>
        الوظائف المفتوحة <span>{client.open_jobs_count}</span>
      </p>
    </div>
  );
}

export default JobClientInfo;
