import React from "react";
import {
  CreditCard,
  FileEarmarkRichtext,
  LockFill,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import style from "./SettingOptions.module.scss";

function SettingOptions() {
  const { i18n } = useTranslation();
  return (
    <>
      <h5>الاعدادات</h5>
      <div className={style.offerProfile}>
        <ul>
          <li>
            <NavLink
              to={`/${i18n.language}/settings/security-settings`}
              activeClassName={style.active}
            >
              <LockFill />
              <span>كلمة المرور والامن</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${i18n.language}/settings/disputes`}
              activeClassName={style.active}
            >
              <FileEarmarkRichtext />
              <span>نزاعاتي</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${i18n.language}/settings/payment-settings`}
              activeClassName={style.active}
            >
              <CreditCard />
              <span>اعدادات الدفع</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SettingOptions;
