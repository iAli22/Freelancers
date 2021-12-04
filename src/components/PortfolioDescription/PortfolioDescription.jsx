import React from "react";
import style from "./PortfolioDescription.module.scss";
import { Link } from "react-router-dom";
import EyeIcon from "../../assets/img/icon-01.svg";
import SettingIcon from "../../assets/img/icon-02.svg";
import OffersIcon from "../../assets/img/icon-03.svg";
import addCircleIcon from "../../assets/img/add-circle.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CardsSkeleton } from "..";
function PortfolioDescription() {
  const { i18n } = useTranslation();
  const profile = useSelector((state) => state.user.user.profile);

  return (
    <>
      <div className={style.portfolioDescription}>
        <ul>
          <li>
            <Link to={`/${i18n.language}/profile`}>
              <img src={EyeIcon} alt="Icon" />
              ملفي الشخصي
            </Link>
          </li>
          <li>
            <Link to={`/${i18n.language}/settings/security-settings`}>
              <img src={SettingIcon} alt="Icon" />
              الاعدادات
            </Link>
          </li>
          <li>
            <Link to={`/${i18n.language}/proposals`}>
              <img src={OffersIcon} alt="Icon" />
              العروض المقدمة
            </Link>
          </li>
        </ul>
      </div>

      {profile && (
        <>
          <div className={style.progressBox}>
            <h1>استكمال الملف الشخصي</h1>

            <div className={`${style.progress} progress`}>
              <div
                className={`${style.progressBar} progress-bar`}
                role="progressbar"
                style={{
                  width: `${profile.profile_completion_percentage}%`,
                }}
                aria-valuenow={profile.profile_completion_percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <span className={style.percentage}>
              {profile.profile_completion_percentage}%
            </span>
          </div>

          {!profile.is_profile_completed &&
            profile.profile_completion_percentage < 100 && (
              <div className={style.portfolioDescription}>
                <ul>
                  <li>
                    <Link to={`/${i18n.language}/profile`}>
                      <img src={addCircleIcon} alt="Icon" />
                      أكمل ملفك الشخصي
                    </Link>
                  </li>
                </ul>
              </div>
            )}
        </>
      )}

      {!profile && (
        <div>
          <CardsSkeleton height={150} />
        </div>
      )}
    </>
  );
}

export default PortfolioDescription;
