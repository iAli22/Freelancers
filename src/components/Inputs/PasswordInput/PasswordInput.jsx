import React, { useState } from "react";
import { Eye, EyeInvisible } from "../../../components";
import style from "./passwordInput.module.scss";
function PasswordInput({ error, ...res }) {
  const [tagglePasswordType, setTagglePasswordType] = useState(false);

  return (
    <div className={style.passwordContainer}>
      <input
        className={
          error
            ? `form-control is-invalid ${style.passwordInput}`
            : `${style.passwordInput}`
        }
        type={tagglePasswordType ? "text" : "password"}
        {...res}
      />

      <div
        className={style.passwordIcon}
        onClick={() => setTagglePasswordType((prevState) => !prevState)}
      >
        {tagglePasswordType ? (
          <EyeInvisible />
        ) : (
          <Eye className={style.passwordIcon} />
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
