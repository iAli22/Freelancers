import React from "react";
import { Image, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import facebookIcon from "../../../assets/icons/facebook-logo.svg";
import linkedinIcon from "../../../assets/icons/linkedin-in.svg";
import qaffLogo from "../../../assets/icons/qaffLogo.svg";
import { MainInput, PasswordInput, SectionTitle } from "../../../components";
import SliderLayout from "../../../Containers/Layouts/SliderLayout";
import { SignIn } from "../../../redux/actions/userAction";
import style from "./login.module.scss";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../../redux/actions/actionTypes";

function Login(props) {
  const { i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const isLoading = useSelector((state) => state.user.isLoading);

  const onSubmit = (data) => {
    props
      .SignIn({
        email: data.userName,
        password: data.password,
        userType: "freelancer",
      })
      .then((res) => {
        if (Object.keys(res.data.data.account_security).length === 1) {
          res.data.data.account_security.map((item) =>
            item.name === "two_step_otp_text"
              ? history.push(`/${i18n.language}/otp-verfication`)
              : history.push({
                  pathname: `/${i18n.language}/question-verfication`,
                  state: { question: item.question },
                })
          );
        } else {
          res.data.data.account_security.map(
            (item) =>
              item.name === "two_step_security_question" &&
              history.push({
                pathname: `/${i18n.language}/otp-question-verfication`,
                state: { question: item.question },
              })
          );
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: LOGIN_FAIL });
      });
  };

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("tokenScopes") === "full-scope"
  ) {
    return <Redirect to={{ pathname: `/${i18n.language}/home` }} />;
  }

  return (
    <SliderLayout>
      <div className={style.login}>
        <div className={style.login__logo}>
          <Image src={qaffLogo} fluid />
        </div>
        <SectionTitle subTitle='Login' style={{ textAlign: "center" }} />
        {/*  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <MainInput
            type='text'
            placeholder='User Name'
            {...register("userName", { required: true })}
            ref={null}
            error={errors.userName}
          />
          {errors.userName && <span>This field is required</span>}

          <PasswordInput
            placeholder='Password'
            {...register("password", { required: true })}
            ref={null}
            error={errors.password}
          />
          {errors.password && <span>This field is required</span>}

          <button type='submit' className={isLoading ? style.disable : ""}>
            {isLoading ? (
              <div className='d-flex justify-content-center align-items-center'>
                <Spinner animation='grow' />
                <b className='mx-1'>Loading</b>
              </div>
            ) : (
              "Submit"
            )}
          </button>

          <Link to={`/${i18n.language}/forget-password`}>
            Forgot Your Password?
          </Link>
        </form>
        {/*  */}

        <div className={style.login__footer}>
          <div className={style.login__footer__top}>
            <Link to={`#`}>Or you can register through</Link>
            <div className={style.icons}>
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                <Image src={linkedinIcon} fluid />
              </a>
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                <Image src={facebookIcon} fluid />
              </a>
            </div>
          </div>

          <p className={style.login__footer__bottom}>
            You don't have an account?
            <Link to={`/${i18n.language}/sign-up`}>Join us now</Link>
          </p>
        </div>
      </div>
    </SliderLayout>
  );
}

export default connect(null, { SignIn })(Login);
