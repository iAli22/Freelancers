import React from "react";
import { Footer, NavBar } from "../../components";
import style from "./layouts.module.scss";

const HomeLayout = ({ children }) => {
  return (
    <section className={style.layout}>
      <NavBar />

      <section className={style.wrapper_page}>{children}</section>

      <Footer />
    </section>
  );
};

export default HomeLayout;
