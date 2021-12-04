import React from "react";
import { NavBar, Footer, ScrollUp, FreshChatContainer } from "../../components";
import style from "./layouts.module.scss";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <section className={style.layout}>
      <ToastContainer />
      <NavBar />

      <section className={style.wrapper_page}>{children}</section>

      <ScrollUp />
      <FreshChatContainer />
      <Footer />
    </section>
  );
};

export default Layout;
