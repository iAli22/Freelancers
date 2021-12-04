import React from "react";
import { Image } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { PortfolioSlider } from "../..";
import circle from "../../../assets/icons/circle.svg";
import style from "../ProfileComponents.module.scss";
function ProfilePortfolio() {
  const portfolio = useSelector(
    (state) => state.commonData.freelancer.portfolio
  );
  return (
    <div className={style.profileContent}>
      <h5>
        معرض اعمالك
        <span>
          <PlusCircleFill />
        </span>
      </h5>

      {portfolio.length !== 0 ? (
        <PortfolioSlider />
      ) : (
        <div className={style.profilGallery}>
          <Image fluid src={circle} alt='Icon' />
          <p>اعرض للعالم مهاراتك وقوتك واظهر ملكاتك بكل قوة</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePortfolio;
