import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CardsSkeleton, LoadMoreBtn } from "../../components";
import { Layout } from "../../Containers";
import {
  getAllNotification,
  resetAllNotification,
} from "../../redux/actions/userAction";
import style from "./Notifications.module.scss";
function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.allNotifications);
  const loading = useSelector((state) => state.user.isLoading);
  const mounted = useRef();
  let [notificationFilter, setNotificationFilter] = useState({
    page: 1,
  });

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      dispatch(resetAllNotification());
      dispatch(getAllNotification(notificationFilter));
    } else {
      dispatch(getAllNotification(notificationFilter));
    }
  }, [dispatch, notificationFilter]);

  const getNextPage = () => {
    setNotificationFilter((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="m-auto" md={{ span: 6, offset: 4 }}>
            {notifications?.latest_notifications?.length > 0 && (
              <div className={style.notificationDescription}>
                <Clock />

                <h1>الأحدث</h1>
              </div>
            )}

            {notifications?.latest_notifications?.map((item) => (
              <div className={style.notificationCard} key={item.id}>
                <p> {item.message}</p>

                <span>{moment.unix(item.created_at).fromNow()}</span>
              </div>
            ))}

            {notifications?.notifications?.data?.length > 0 && (
              <div className={style.notificationDescription}>
                <Clock />

                <h1>الاقدم</h1>
              </div>
            )}

            {notifications?.notifications?.data?.map((item) => (
              <div className={style.notificationCard} key={item.id}>
                <p> {item.message}</p>

                <span>{moment.unix(item.created_at).fromNow()}</span>
              </div>
            ))}

            {loading &&
              [...Array(16)].map((item, idx) => (
                <div key={idx}>
                  <CardsSkeleton
                    height={100}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
              ))}

            {notifications.notifications?.data.length > 0 && (
              <LoadMoreBtn
                hasMorePages={
                  notifications.notifications?.data?.meta?.has_more_pages
                    ? notifications.notifications?.data?.meta?.has_more_pages
                    : false
                }
                getNextPage={getNextPage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Notifications;
