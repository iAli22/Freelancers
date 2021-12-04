import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import qaffLogo from "../../../assets/icons/qaffLogo.svg";
import { SectionTitle } from "../../../components";
import SliderLayout from "../../../Containers/Layouts/SliderLayout";
import { NOT_LOADING } from "../../../redux/actions/actionTypes";
import { CreateNewPassword } from "../../../redux/actions/userAction";
import style from "./ResetPassword.module.scss";
import { successToast } from "../../../helper/toastMessage";

function ResetPassword(props) {
  const history = useHistory();
  const isLoading = useSelector((state) => state.user.isLoading);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [changePassType, setChangePassType] = useState({
    password: false,
    confirmNewPassword: false,
  });
  const ResetPasswordSchema = Yup.object({
    password: Yup.string()
      .min(8, "Your password must be between 8 and 30 characters")
      .max(15)
      .matches(
        /[@$!%*?&]/,
        "Your password must contain at least one special characters"
      )
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])/,
        "Your password must contain at least one uppercase and lowercase letter"
      )
      .matches(/[0-9]/, "Your password must contain at least one number")
      .required("Password is required"),

    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = (data) => {
    const sendData = {
      password: data?.password,
      email: props.location.state?.email,
      otp: props.location.state?.otp,
    };

    dispatch(CreateNewPassword(sendData))
      .then((res) => {
        dispatch({
          type: NOT_LOADING,
        });
        history.push(`/${i18n.language}/login`);

        successToast(res.data.message);
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
          subTitle="Reset Password"
          style={{ textAlign: "center" }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={12}>
              <div
                className={`${style.inputContainer} ${
                  errors.password && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type={changePassType.password ? "text" : "password"}
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={value || ""}
                        placeholder="كلمة المرور الجديد"
                      />

                      <div
                        className={style.passwordIcon}
                        onClick={() =>
                          setChangePassType((prevState) => {
                            return {
                              ...prevState,
                              password: !changePassType.password,
                            };
                          })
                        }
                      >
                        {!changePassType.password ? (
                          <EyeFill
                            fill="#00c7d4"
                            className={style.passwordIcon}
                          />
                        ) : (
                          <EyeSlashFill
                            fill="#00c7d4"
                            className={style.passwordIcon}
                          />
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>

              {errors.password && (
                <span className={style.errors}>{errors.password.message}</span>
              )}
            </Col>

            <Col lg={12}>
              <div
                className={`${style.inputContainer} ${
                  errors.confirmNewPassword && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="confirmNewPassword"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type={
                          changePassType.confirmNewPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        onChange={onChange}
                        value={value || ""}
                        placeholder="تأكيد كلمة المرور الجديد
"
                      />

                      <div
                        className={style.passwordIcon}
                        onClick={() =>
                          setChangePassType((prevState) => {
                            return {
                              ...prevState,
                              confirmNewPassword:
                                !changePassType.confirmNewPassword,
                            };
                          })
                        }
                      >
                        {!changePassType.confirmNewPassword ? (
                          <EyeFill
                            fill="#00c7d4"
                            className={style.passwordIcon}
                          />
                        ) : (
                          <EyeSlashFill
                            fill="#00c7d4"
                            className={style.passwordIcon}
                          />
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>

              {errors.confirmNewPassword && (
                <span className={style.errors}>
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </Col>
          </Row>

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

export default ResetPassword;
