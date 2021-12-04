import React, { useCallback, useEffect, useState } from "react";
import { ArrowUpShort } from "react-bootstrap-icons";
import style from "./ScrollUp.module.scss";
function ScrollUp() {
  const [isScroll, setIsScroll] = useState(false);

  const fixedOnScroll = useCallback(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);
  useEffect(() => {
    fixedOnScroll();
  }, [fixedOnScroll]);

  return (
    <div
      className={`${
        style.backToTop
      } d-flex align-items-center justify-content-center ${
        isScroll && `${style.active}`
      }`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <ArrowUpShort />
    </div>
  );
}

export default ScrollUp;
