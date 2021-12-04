import React, { useEffect } from "react";
import style from "./Activities.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetFreelancerStatics } from "../../redux/actions/userAction";
import { CardsSkeleton } from "../index";
import { Row, Col } from "react-bootstrap";
function Activities() {
  const dispatch = useDispatch();
  const freelancerStatics = useSelector(
    (state) => state.user.freelancerStatics
  );

  useEffect(() => {
    dispatch(GetFreelancerStatics());
  }, [dispatch]);

  return (
    <>
      <h5>الأنشطة الخاصة بي</h5>
      <Row>
        {!freelancerStatics?.contracts &&
          [...Array(4)].map((item, index) => (
            <Col lg={3} key={index}>
              <CardsSkeleton height={110} />
            </Col>
          ))}
        {freelancerStatics.contracts && (
          <>
            <Col lg={3}>
              <div className={style.circlePercentage}>
                <p className={style.circle}>
                  {freelancerStatics?.contracts?.pending}
                </p>
                <p>العروض المقدمة</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className={style.circlePercentage}>
                <p className={style.circle}>
                  {freelancerStatics?.contracts?.active}
                </p>
                <p>العروض النشطة</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className={style.circlePercentage}>
                <p className={style.circle}>
                  {freelancerStatics?.invitations?.pending}
                </p>
                <p>دعوات لمقابلة</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className={style.circlePercentage}>
                <p className={style.circle}>
                  {freelancerStatics?.proposals?.draft}
                </p>
                <p>مسودة العروض</p>
              </div>
            </Col>
          </>
        )}
      </Row>
      <div className={style.latestJob}>
        <h1>أحدث الوظائف المناسبة لك</h1>
        <p>
          استعرض احدث الوظائف المناسبة لك والتي تم عرضها بناء علي المهارات
          الخاصة بك وعلي التوصيف الموجود في ملفك الشخصي
        </p>
      </div>
    </>
  );
}

export default Activities;
