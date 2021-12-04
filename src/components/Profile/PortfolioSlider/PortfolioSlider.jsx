import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Keyboard, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { PortfolioCard } from "../..";
import ArrowNext from "../../Icons/ArrowNext";
import ArrowPrev from "../../Icons/ArrowPrev";
import style from "./portfolioSlider.module.scss";

// install Swiper modules
SwiperCore.use([Keyboard, Navigation]);

function PortfolioSlider() {
  const portfolio = useSelector(
    (state) => state.commonData.freelancer.portfolio
  );

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { i18n } = useTranslation();

  let currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    swiperRef.current.swiper.slideTo(2);
    swiperRef.current.swiper.update();
  }, [currentDir, nextRef, prevRef]);

  return (
    <Swiper
      // centeredSlides={true}
      observer={true}
      keyboard={{
        enabled: true,
      }}
      dir={currentDir}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
      }}
      className={style.inspiredSwiper}
      ref={swiperRef}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
    >
      {portfolio.map((item) => (
        <SwiperSlide key={item.id}>
          <PortfolioCard
            date={item.date}
            desc={item.description}
            img={item.image}
            title={item.title}
            images={item?.images}
          />
        </SwiperSlide>
      ))}

      {portfolio.length > 3 && (
        <>
          <div ref={prevRef} className={style.prev}>
            <ArrowPrev dir={currentDir} />
          </div>
          <div ref={nextRef} className={style.next}>
            <ArrowNext dir={currentDir} />
          </div>
        </>
      )}
    </Swiper>
  );
}

export default PortfolioSlider;
