import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LightBoxSliderLayout } from "../../../Containers";
import style from "./portfolioCard.module.scss";

function PortfolioCard({ img, title, desc, date, images = [] }) {
  return (
    <div className={style.galleryThumb}>
      <h4>{title}</h4>
      {date && <p>{date} </p>}

      <LightBoxSliderLayout>
        <Image src={img} fluid className={style.blogImg} />

        {images
          .filter((item, idx) => idx >= 1)
          .map((item) => (
            <Image
              src={item.path}
              key={item.id}
              fluid
              className={style.blogImg}
              style={{ display: "none" }}
            />
          ))}
      </LightBoxSliderLayout>

      {desc && <p className={`${style.galaryP}`}>{desc}</p>}

      <Link to="#">Web Application</Link>
    </div>
  );
}

export default PortfolioCard;
