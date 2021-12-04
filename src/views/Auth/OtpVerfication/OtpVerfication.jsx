import React, { useRef } from "react";
import { Image, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import qaffLogo from "../../../assets/icons/qaffLogo.svg";
import { MainInput, SectionTitle } from "../../../components";
import SliderLayout from "../../../Containers/Layouts/SliderLayout";
import { LoginOTP } from "../../../redux/actions/userAction";
import {
  LOGIN_OTP_SUCCESS,
  LOGIN_FAIL,
} from "../../../redux/actions/actionTypes";
import style from "./OtpVerfication.module.scss";

function OtpVerfication() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const { i18n } = useTranslation();
  const inputsRef = useRef(null);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("tokenScopes") === "full-scope"
  ) {
    return <Redirect to={{ pathname: `/${i18n.language}/home` }} />;
  }
  const onSubmit = (data) => {
    let isFinalStep =
      JSON.parse(localStorage.getItem("accountSecurity")).length === 2
        ? false
        : true;
    let newValues = `${data.first}${data.second}${data.third}${data.fourth}`;
    dispatch(
      LoginOTP({
        is_final_step: `${isFinalStep}`,
        two_step_otp_text: newValues,
      })
    )
      .then((res) =>
        dispatch({
          type: LOGIN_OTP_SUCCESS,
          payload: res.data.data,
        })
      )
      .catch((err) => dispatch({ type: LOGIN_FAIL }));
  };

  const handelInput = (e) => {
    const currentInput = e.target;
    if (currentInput.value && currentInput.nextElementSibling !== null) {
      currentInput.nextElementSibling.focus();
    }
  };
  const handelOnPaste = (e) => {
    const verifyCode = e.clipboardData.getData("text");
    const inputs = inputsRef.current.children;
    const inputsNames = ["first", "second", "third", "fourth"];
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      input.value = verifyCode[i];
      setValue(inputsNames[i], verifyCode[i]);
    }
    inputs[3].focus();
  };
  return (
    <SliderLayout>
      <div className={style.signUp}>
        <div className={style.signUp__logo}>
          <Link to={`/${i18n.language}/login`}>
            <Image src={qaffLogo} fluid />
          </Link>
        </div>
        <SectionTitle
          subTitle="Verify Your OTP"
          style={{ textAlign: "center" }}
        />
        <form onSubmit={handleSubmit(onSubmit)} onInput={handelInput}>
          <div className={style.signUp__verifyInputs} ref={inputsRef}>
            <Controller
              name="first"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MainInput
                  maxLength="1"
                  type="text"
                  onChange={onChange}
                  value={value || ""}
                  ref={null}
                  onPaste={handelOnPaste}
                />
              )}
            />
            <Controller
              name="second"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MainInput
                  maxLength="1"
                  type="text"
                  onChange={onChange}
                  value={value || ""}
                  ref={null}
                  onPaste={handelOnPaste}
                />
              )}
            />
            <Controller
              name="third"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MainInput
                  maxLength="1"
                  type="text"
                  onChange={onChange}
                  value={value || ""}
                  ref={null}
                  onPaste={handelOnPaste}
                />
              )}
            />
            <Controller
              name="fourth"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <MainInput
                  maxLength="1"
                  type="text"
                  onChange={onChange}
                  value={value || ""}
                  ref={null}
                  onPaste={handelOnPaste}
                />
              )}
            />{" "}
          </div>
          {Object.keys(errors).length > 0 && (
            <span style={{ color: "red" }}>Please fill all fields</span>
          )}
          <button type="submit" className={isLoading ? style.disable : ""}>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="grow" />
                <b className="mx-1">Loading</b>
              </div>
            ) : (
              "Verfiy OTP"
            )}
          </button>
        </form>
      </div>
    </SliderLayout>
  );
}

export default OtpVerfication;
