import React from "react";
import { Image } from "react-bootstrap";
import { ChatLeftDotsFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CardsSkeleton } from "../..";
import femaleImage from "../../../assets/img/female1.png";
import maleImage from "../../../assets/img/male1.png";
import Star from "../../Icons/Star";
import style from "./ClientInfo.module.scss";

function ClientInfo({ client, type }) {
  const { i18n } = useTranslation();

  return (
    <>
      <h5>العروض</h5>

      {Object.keys(client).length > 0 ? (
        <div className={style.offerProfile}>
          <Image
            src={
              client?.posted_by.profile_image
                ? client?.posted_by.profile_image
                : client?.posted_by.gender === "female"
                ? femaleImage
                : maleImage
            }
            fluid
            alt=""
          />
          <h3>{client?.posted_by.name}</h3>

          {type !== "showProposal" && type !== "submitProposal" && (
            <Link to={`/${i18n.language}/show-proposal/${client?.proposal_id}`}>
              شاهد العرض الاصلي
            </Link>
          )}
          <Link to={`/${i18n.language}/job-details/${client.id}`}>
            شاهد تفاصيل الوظيفة
          </Link>
          <p className={style.customer}>تقييم العميل</p>
          <p>
            4.3
            <Star rate={4.3} />
          </p>

          <button type="button" className="btn btn-primary">
            <ChatLeftDotsFill /> تحدث مع العميل
          </button>
        </div>
      ) : (
        <div>
          <CardsSkeleton height={400} />
        </div>
      )}
    </>
  );
}

export default ClientInfo;
