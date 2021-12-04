import React from "react";
import defaultBannar from "../../assets/img/aboutUsBg.png";
import style from "./layouts.module.scss";
const PageLayout = ({ bannar = defaultBannar, children }) => {
  return (
    <section
      className={style.pageLayout}
      style={{
        backgroundImage: `url(${bannar}),
    linear-gradient(180deg, #f8f4f3 0%, #d7dee4 100%)`,
      }}>
      <div>{children}</div>
    </section>
  );
};

export default PageLayout;
