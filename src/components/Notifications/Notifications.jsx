import moment from "moment";
import React, { useEffect } from "react";
import { Clock } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNotification,
  readNotifications,
} from "../../redux/actions/userAction";
import style from "./Notifications.module.scss";

function Notifications() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const notifications = useSelector((state) => state.user.notifications);

  useEffect(() => {
    dispatch(readNotifications());
    dispatch(getNotification({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={style.notifications}>
      <ul>
        <div className={style.notificationHeader}>
          <h3>التنبيهات</h3>
          <span>
            <Link to={`/${i18n.language}/notifications`}>
              <button
                type="button"
                className={`btn btn-primary ${style.changeTerms}`}
              >
                اظهار الاكل
              </button>
            </Link>
          </span>
        </div>
        {notifications?.latest_notifications?.length > 0 && (
          <h4 className={style.notificationDescription}>
            <Clock /> الأحدث
          </h4>
        )}
        {notifications?.latest_notifications?.map((item) => (
          <li key={item.id}>
            {item.message}
            <span>{moment.unix(item.created_at).fromNow()}</span>
          </li>
        ))}
        {notifications?.notifications?.data?.length > 0 && (
          <h4 className={style.notificationDescription}>
            <Clock /> الأقدم
          </h4>
        )}
        {notifications?.notifications?.data?.map((item) => (
          <li key={item.id}>
            {item.message}
            <span>{moment.unix(item.created_at).fromNow()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
