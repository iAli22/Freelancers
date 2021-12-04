import React from "react";
import style from "./roundedBtn.module.scss";
function RoundedBtn({ bgColor, color, border, text, to }) {
  return (
    <a
      href={to}
      style={{
        border: border,
        backgroundColor: bgColor,
        color: color,
      }}
      className={style.roundedBtn}
    >
      {text}
    </a>
  );
}

export default RoundedBtn;
