import React from "react";
import style from "./mainInput.module.scss";

function MainInput({ error, ...res }) {
  return (
    <input
      className={
        error
          ? `form-control is-invalid ${style.mainInput}`
          : `${style.mainInput}`
      }
      {...res}
    />
  );
}

export default MainInput;
