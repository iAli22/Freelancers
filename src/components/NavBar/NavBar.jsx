import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import {
  BoxArrowRight,
  ChevronDown,
  Heart,
  List,
  X,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import notificationsIcon from "../../assets/icons/notifications-icon.svg";
// import userLogo from "../../assets/img/user-img.png";
import mainLogo from "../../assets/icons/qaffLogo.svg";
import femaleImage from "../../assets/img/female1.png";
import SettingIcon from "../../assets/img/icon-02.svg";
import maleImage from "../../assets/img/male1.png";
import {
  getNotification,
  getUserProfile,
  signOut,
} from "../../redux/actions/userAction";
import Notifications from "../Notifications/Notifications";
import style from "./navbar.module.scss";

function NavBar() {
  const { i18n } = useTranslation();
  const history = useHistory();
  const changedToLang = i18n.language === "ar" ? "en" : "ar";
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";
  const oldRoute = window.location.pathname.includes(i18n.language)
    ? window.location.pathname.split("/").splice(2).join("/")
    : window.location.pathname;
  const userProfile = useSelector((state) => state.user.user);
  const notifications = useSelector((state) => state.user.notifications);
  const [isMobile, setIsMobile] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const mounted = useRef();
  const RefNotication = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideNotifaction);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNotifaction);
    };
  }, []);

  const handleClickOutsideNotifaction = (event) => {
    if (RefNotication && !RefNotication.current.contains(event.target)) {
      setShowNotification(false);
    }
  };

  useEffect(() => {
    dispatch(getNotification({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (Object.keys(userProfile).length === 0) {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, userProfile]);

  const targetA = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle(style.dropdownActive);
  };
  useEffect(() => {
    document.documentElement.dir = currentDir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language, currentDir]);

  return (
    <header className={`${style.header} fixed-top d-flex align-items-center`}>
      <div className='container d-flex align-items-center justify-content-between'>
        <div className={style.logo}>
          <Link to={`/${i18n.language}/home`}>
            <Image src={mainLogo} alt='' fluid />
          </Link>
        </div>

        <nav
          className={`${style.navbar} ${isMobile && style.navbarMobile}`}
          id='navbar'>
          <ul
            style={{
              display: isMobile && "block",
            }}>
            <li className={style.dropdown}>
              <Link to='#' onClick={(e) => targetA(e)}>
                <ChevronDown />

                <span>ابحث عن عمل</span>
              </Link>
              <ul>
                <li>
                  <Link to='#'>Drop Down 1</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 2</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 3</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 4</Link>
                </li>
              </ul>
            </li>

            <li className={style.dropdown}>
              <Link to='#' onClick={(e) => targetA(e)}>
                <ChevronDown />
                <span>العقود</span>
              </Link>
              <ul>
                <li>
                  <Link to='#'>Drop Down 1</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 2</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 3</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 4</Link>
                </li>
              </ul>
            </li>

            <li className={style.dropdown}>
              <Link to='#' onClick={(e) => targetA(e)}>
                <ChevronDown />
                <span>الرسائل</span>
              </Link>
              <ul>
                <li>
                  <Link to='#'>Drop Down 1</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 2</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 3</Link>
                </li>
                <li>
                  <Link to='#'>Drop Down 4</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div
            className={style.mobileNavToggle}
            onClick={() => setIsMobile(() => !isMobile)}>
            {!isMobile ? <List size={30} /> : <X size={30} />}
          </div>
        </nav>

        <div className={style.userLogin}>
          <ul>
            <li>
              <Link
                to='#'
                className={style.langChangeBtn}
                onClick={() => {
                  i18n.changeLanguage(changedToLang);
                  history.push(`/${changedToLang}/${oldRoute}`);
                  window.location.reload();
                }}>
                {" "}
                {i18n.language === "en" ? "عربي" : "English"}
              </Link>
            </li>
            <li className={style.notification} ref={RefNotication}>
              <Image
                src={notificationsIcon}
                onClick={() => setShowNotification(!showNotification)}
                alt='Icon'
                fluid
              />
              {notifications?.unread_notificaiton_count > 0 && (
                <div className={style.billCount}>
                  {notifications?.unread_notificaiton_count}
                </div>
              )}
              {showNotification && <Notifications />}
            </li>
            <li className={style.userImg}>
              <Dropdown className='d-inline mx-2'>
                <Dropdown.Toggle className={style.ImageDropdown}>
                  {userProfile?.profile?.profile_image && (
                    <Image
                      src={
                        userProfile?.profile?.profile_image
                          ? userProfile?.profile?.profile_image
                          : userProfile?.profile?.gender === "female"
                          ? femaleImage
                          : maleImage
                      }
                      alt='userLogo'
                    />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    className={`${style.dropdownItem} ${style.personInfo}`}
                    to={`/${i18n.language}/profile`}>
                    <Image
                      src={
                        userProfile?.profile?.profile_image
                          ? userProfile?.profile?.profile_image
                          : userProfile?.profile?.gender === "female"
                          ? femaleImage
                          : maleImage
                      }
                      alt='userLogo'
                    />
                    <div className={style.presonData}>
                      <h6>{userProfile?.profile?.first_name}</h6>
                      <p>{userProfile?.profile?.email}</p>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item className={style.dropdownItem}>
                    <div
                      onClick={() =>
                        history.push(
                          `/${i18n.language}/settings/security-settings`
                        )
                      }
                      className={style.dropdownLink}>
                      <h6>الإعدادات</h6>
                      <img src={SettingIcon} alt='Icon' />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className={style.dropdownItem}>
                    <div
                      onClick={() =>
                        history.push(`/${i18n.language}/favorites-job`)
                      }
                      className={style.dropdownLink}>
                      <h6>الوظائف المفضلة</h6>
                      <Heart />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className={style.dropdownItem}>
                    <div
                      onClick={() =>
                        dispatch(signOut()).then(() =>
                          history.push(`/${i18n.language}/login`)
                        )
                      }
                      className={style.dropdownLink}>
                      <h6>تسجيل الخروج</h6>
                      <BoxArrowRight />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
