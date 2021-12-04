import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import style from "./SecurityQuestionsModal.module.scss";

function SecurityQuestionsModal({
  isShow,
  handleClose,
  securityQuestionData,
  changeSecurityQuestion,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onDataSubmit = (data) => {
    changeSecurityQuestion(securityQuestionData.name, {
      is_enabled: true,
      answer: data.answer,
      question: data.question.value,
    });
  };

  return (
    <Modal show={isShow} onHide={() => handleClose(false)} centered>
      <form onSubmit={handleSubmit(onDataSubmit)}>
        <Modal.Header closeButton className='d-flex justify-content-between'>
          <Modal.Title className={`w-100 ${style.modelTitle}`}>
            أسئلة الحماية
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <label htmlFor='question'>سؤال جديد</label>
              <Controller
                control={control}
                name='question'
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={false}
                    placeholder={"Please choose any question"}
                    options={securityQuestionData.options.map((option) => {
                      return { label: option, value: option };
                    })}
                  />
                )}
              />
            </Col>
            <Col lg={12}>
              <label htmlFor='answer'>الاجابة</label>
              <div
                className={`${style.inputContainer} ${
                  errors.answer && style.errors
                } `}>
                <Controller
                  control={control}
                  name='answer'
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type='text'
                      name='answer'
                      id='answer'
                      onChange={onChange}
                      value={value || ""}
                    />
                  )}
                />
              </div>

              {errors.period && (
                <span className={style.errors}>This field is required</span>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className={style.footer}>
          <Button
            variant='primary'
            className={`btn-primary ${style.presentation}`}
            type='submit'>
            حفظ
          </Button>
          <Button
            variant='primary'
            className={`btn-primary ${style.cancel}`}
            onClick={() => handleClose(false)}
            type='button'>
            الغاء
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default SecurityQuestionsModal;
