import React from "react";
import { Link } from "react-router-dom";
import style from "./roundedBtn.module.scss";
function RoundedBtn({ bgColor, color, border, text, to }) {
  return (
    <Link
      to={to}
      style={{
        border: border,
        backgroundColor: bgColor,
        color: color,
      }}
      className={style.roundedBtn}
    >
      {text}
    </Link>
  );
}

export default RoundedBtn;
