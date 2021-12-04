import React from "react";
import style from "./title.module.scss";

function Title({ title, subTitle, ...res }) {
  return (
    <div className={style.sectionTitle} {...res}>
      <h3>{title}</h3>
      <h3>{subTitle}</h3>
    </div>
  );
}

export default Title;
