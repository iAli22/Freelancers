import React from "react";
import { Image, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
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
import style from "./SecurityQuestionVerfication.module.scss";

function SecurityQuestionVerfication(props) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("tokenScopes") === "full-scope"
  ) {
    return <Redirect to={{ pathname: `/${i18n.language}/home` }} />;
  }

  const onSubmit = (data) => {
    dispatch(
      LoginOTP({
        is_final_step: `true`,
        two_step_security_question: data.answer,
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
  return (
    <SliderLayout>
      <div className={style.signUp}>
        <div className={style.signUp__logo}>
          <Link to={`/${i18n.language}/login`}>
            <Image src={qaffLogo} fluid />
          </Link>
        </div>
        <SectionTitle
          subTitle='Two step verification'
          style={{ textAlign: "center" }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className='text-center'>Security Question</h4>
          <p className={style.question}>{props.location.state.question}</p>
          <div className={style.signUp__verifyInputs}>
            <MainInput
              {...register("answer", { required: true })}
              placeholder='Write your answer'
              type='text'
              ref={null}
            />
          </div>
          {Object.keys(errors).length > 0 && (
            <span className={style.error}>Please Answer the question</span>
          )}
          <button type='submit' className={isLoading ? style.disable : ""}>
            {isLoading ? (
              <div className='d-flex justify-content-center align-items-center'>
                <Spinner animation='grow' />
                <b className='mx-1'>Loading</b>
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

export default SecurityQuestionVerfication;
