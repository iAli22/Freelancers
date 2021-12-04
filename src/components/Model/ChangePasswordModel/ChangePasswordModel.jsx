import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { errorToast, successToast } from "../../../helper/toastMessage";
import { changePassword } from "../../../redux/actions/userAction";
import style from "./ChangePasswordModel.module.scss";

function ChangePasswordModel({ isShow, handleClose }) {
  const dispatch = useDispatch();
  const [changePassType, setChangePassType] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const changePasswordSchema = Yup.object({
    currentPassword: Yup.string().required("Password is required"),
    newPassword: Yup.string()
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
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onDataSubmit = (data) => {
    dispatch(
      changePassword({
        account_type: "freelancer",
        current_password: data.currentPassword,
        new_password: data.newPassword,
      })
    )
      .then((res) => {
        successToast(res.data.message);
        handleClose(false);
      })
      .catch((error) => {
        errorToast(error.message);
        handleClose(false);
      });
  };
  return (
    <Modal show={isShow} onHide={() => handleClose(false)} centered>
      <form onSubmit={handleSubmit(onDataSubmit)}>
        <Modal.Header closeButton className="d-flex justify-content-between">
          <Modal.Title className={`w-100 ${style.modelTitle}`}>
            تغيير كلمة المرور
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <label htmlFor="currentPassword"> كلمة المرور الحالي</label>
              <div
                className={`${style.inputContainer} ${
                  errors.currentPassword && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type={
                          changePassType.currentPassword ? "text" : "password"
                        }
                        name="currentPassword"
                        id="currentPassword"
                        onChange={onChange}
                        value={value || ""}
                      />

                      <div
                        className={style.passwordIcon}
                        onClick={() =>
                          setChangePassType((prevState) => {
                            return {
                              ...prevState,
                              currentPassword: !changePassType.currentPassword,
                            };
                          })
                        }
                      >
                        {!changePassType.currentPassword ? (
                          <EyeFill className={style.passwordIcon} />
                        ) : (
                          <EyeSlashFill className={style.passwordIcon} />
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>

              {errors.currentPassword && (
                <span className={style.errors}>
                  {errors.currentPassword.message}
                </span>
              )}
            </Col>

            <Col lg={12}>
              <label htmlFor="newPassword"> كلمة المرور الجديد</label>
              <div
                className={`${style.inputContainer} ${
                  errors.newPassword && style.errors
                } `}
              >
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, value } }) => (
                    <div className={style.passwordContainer}>
                      <input
                        type={changePassType.newPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        onChange={onChange}
                        value={value || ""}
                      />

                      <div
                        className={style.passwordIcon}
                        onClick={() =>
                          setChangePassType((prevState) => {
                            return {
                              ...prevState,
                              newPassword: !changePassType.newPassword,
                            };
                          })
                        }
                      >
                        {!changePassType.newPassword ? (
                          <EyeFill className={style.passwordIcon} />
                        ) : (
                          <EyeSlashFill className={style.passwordIcon} />
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>

              {errors.newPassword && (
                <span className={style.errors}>
                  {errors.newPassword.message}
                </span>
              )}
            </Col>

            <Col lg={12}>
              <label htmlFor="confirmNewPassword">
                تأكيد كلمة المرور الجديد{" "}
              </label>
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
                          <EyeFill className={style.passwordIcon} />
                        ) : (
                          <EyeSlashFill className={style.passwordIcon} />
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
        </Modal.Body>
        <Modal.Footer className={style.footer}>
          <Button
            variant="primary"
            className={`btn-primary ${style.presentation}`}
            type="submit"
          >
            حفظ
          </Button>
          <Button
            variant="primary"
            className={`btn-primary ${style.cancel}`}
            onClick={() => handleClose(false)}
            type="button"
          >
            الغاء
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default ChangePasswordModel;
