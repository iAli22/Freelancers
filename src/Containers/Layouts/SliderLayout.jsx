import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import bg1 from "../../assets/img/aboutUsBg.png";
import style from "./layouts.module.scss";
import { ToastContainer } from "react-toastify";
import { FreshChatContainer } from "../../components";

SwiperCore.use([Pagination, Autoplay]);

function SliderLayout({ children }) {
  const { i18n } = useTranslation();
  const swiperRef = useRef(null);

  let currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <>
      <ToastContainer />
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
        }}
        observer
        ref={swiperRef}
        dir={currentDir}
        className={style.sliderLayout}
      >
        <SwiperSlide>
          <Image src={bg1} fluid />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bg1} fluid />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bg1} fluid />
        </SwiperSlide>

        {/* Auth Box */}
        <section className={style.authBox}>{children}</section>

        <FreshChatContainer />
      </Swiper>
    </>
  );
}

export default SliderLayout;
