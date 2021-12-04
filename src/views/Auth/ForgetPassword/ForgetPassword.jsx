import React from "react";
import { Image, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import qaffLogo from "../../../assets/icons/qaffLogo.svg";
import { MainInput, SectionTitle } from "../../../components";
import SliderLayout from "../../../Containers/Layouts/SliderLayout";
import { ForgetEmailPassword } from "../../../redux/actions/userAction";
import { NOT_LOADING } from "../../../redux/actions/actionTypes";
import style from "./ForgetPassword.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function ForgetPassword() {
  const history = useHistory();
  const isLoading = useSelector((state) => state.user.isLoading);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const forgetPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(ForgetEmailPassword(data))
      .then((res) => {
        dispatch({
          type: NOT_LOADING,
        });
        history.push({
          pathname: `/${i18n.language}/reset-password-otp`,
          state: { email: data.email },
        });
      })
      .catch((err) =>
        dispatch({
          type: NOT_LOADING,
        })
      );
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
          subTitle="Password Recovery"
          style={{ textAlign: "center" }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.signUp__verifyInputs}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <MainInput
                  placeholder="Enter email to reset password"
                  type="text"
                  onChange={onChange}
                  value={value || ""}
                  ref={null}
                />
              )}
            />
          </div>
          {errors.email && (
            <span className={style.error}>{errors.email.message}</span>
          )}

          <button type="submit" className={isLoading ? style.disable : ""}>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="grow" />
                <b className="mx-1">Loading</b>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </SliderLayout>
  );
}

export default ForgetPassword;
