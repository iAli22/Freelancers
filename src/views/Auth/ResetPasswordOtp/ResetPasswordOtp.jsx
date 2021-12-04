import React, { useEffect, useRef, useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import qaffLogo from "../../../assets/icons/qaffLogo.svg";
import { MainInput, SectionTitle } from "../../../components";
import SliderLayout from "../../../Containers/Layouts/SliderLayout";
import { NOT_LOADING } from "../../../redux/actions/actionTypes";
import { ForgetPasswordOtp } from "../../../redux/actions/userAction";
import style from "./ResetPasswordOtp.module.scss";

function ResetPasswordOtp(props) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const { i18n } = useTranslation();
  const history = useHistory();
  const inputsRef = useRef(null);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,

    control,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(props.location.state.email);
  }, [props.location.state.email]);

  const onSubmit = (data) => {
    let newValues = `${data.first}${data.second}${data.third}${data.fourth}`;
    dispatch(ForgetPasswordOtp({ email: email, otp: newValues }))
      .then((res) => {
        dispatch({
          type: NOT_LOADING,
        });
        history.push({
          pathname: `/${i18n.language}/reset-password`,
          state: { email, otp: newValues },
        });
      })
      .catch((err) =>
        dispatch({
          type: NOT_LOADING,
        })
      );
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
            />
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

export default ResetPasswordOtp;
