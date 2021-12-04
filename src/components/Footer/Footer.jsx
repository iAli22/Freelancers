import React from "react";
import { Link } from "react-router-dom";
import style from "./footer.module.scss";
// Icons
import faceBookIcon from "../../assets/icons/facebook-logo.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import linkedinIcon from "../../assets/icons/linkedin-in.svg";

import qaffLogoBlack from "../../assets/icons/qaffLogoBlack.svg";
import googlePlayIcon from "../../assets/icons/google-play.svg";
import appleIcon from "../../assets/icons/apple.svg";
import { Image } from "react-bootstrap";
function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerTop}>
        <div className="container">
          <div className="row">
            <div className={`col-lg-3 col-md-6 ${style.footerContact}`}>
              <Image src={qaffLogoBlack} fluid alt="Logo" />

              <p>App available on</p>

              <ul>
                <li>
                  <Link to="#">
                    <Image src={appleIcon} fluid />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <Image src={googlePlayIcon} fluid />
                  </Link>
                </li>
              </ul>
            </div>

            <div className={`col-lg-3 col-md-6 ${style.footerLinks}`}>
              <h4>قاف</h4>
              <ul>
                <li>
                  <Link to="#">مجالات التخصص</Link>
                </li>
                <li>
                  <Link to="#">المشاريع</Link>
                </li>
                <li>
                  <Link to="#">طالبي العمل</Link>
                </li>
              </ul>
            </div>

            <div className={`col-lg-3 col-md-6 ${style.footerLinks}`}>
              <h4>عن قاف</h4>
              <ul>
                <li>
                  <Link to="#">عن المنصة</Link>
                </li>
                <li>
                  <Link to="#">كيف يعمل</Link>
                </li>
                <li>
                  <Link to="#">الامن</Link>
                </li>
              </ul>
            </div>

            <div className={`col-lg-3 col-md-6 ${style.footerLinks}`}>
              <h4>الحقوق</h4>
              <ul>
                <li>
                  <Link to="#">سياسة الخصوصية</Link>
                </li>
                <li>
                  <Link to="#">الشروط والأحكام</Link>
                </li>
                <li>
                  <Link to="#">حقوق الملكية الفكرية</Link>
                </li>
                <li>
                  <Link to="#">قواعد السلوك</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`${style.footerBtm} py-4`}>
        <div className="container">
          <div className={`${style.copyright} col-lg-10`}>
            © حقوق الطبع والنشر 2020 Qaff. كل الحقوق محفوظة.
          </div>
          <div className={`${style.credits} col-lg-2`}>
            <ul>
              <li>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Image src={linkedinIcon} fluid />
                </Link>
              </li>
              <li>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Image src={instagramIcon} fluid />
                </Link>
              </li>
              <li>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Image src={twitterIcon} fluid />
                </Link>
              </li>
              <li>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Image src={faceBookIcon} fluid />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
