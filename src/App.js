import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ScrollToTop, OnRouterChange } from "./components";
import routes from "./routes";
import { ROUTE } from "./constants/Routes";
import PrivateRoute from "./routes/PrivateRoute";
import {
  Login,
  OtpVerfication,
  SecurityQuestionVerfication,
  OtpQuestionVerfication,
  ForgetPassword,
  ResetPasswordOtp,
  ResetPassword,
} from "./views";

function App() {
  const { i18n } = useTranslation();
  // Redirect to Right Path if no Lang params
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";
  const oldRoute = window.location.pathname.includes(i18n.language)
    ? window.location.pathname.split("/").splice(2).join("/")
    : window.location.pathname;

  const langParam = window.location.pathname.split("/").splice(1)[0];

  useEffect(() => {
    document.documentElement.dir = currentDir;
    document.documentElement.lang = i18n.language;

    if (langParam === "ar" && i18n.language === "en") {
      i18n.changeLanguage("ar");
    } else if (langParam === "en" && i18n.language === "ar") {
      i18n.changeLanguage("en");
    } else if (!window.location.pathname.includes(i18n.language)) {
      //  If There is No Lang at All =>
      if (oldRoute !== "" && oldRoute !== "/") {
        window.location.href = `/${i18n.language}${oldRoute}`;
      } else if (oldRoute === "/") {
        window.location.href = `/${i18n.language}/home`;
      } else {
        window.location.href = `/${i18n.language}`;
      }
    }
  }, [currentDir, i18n, langParam, oldRoute]);

  return (
    <Router>
      <ScrollToTop />
      <OnRouterChange />
      <Switch>
        {/* Private Routes */}
        {routes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}

        {/* Public Routes */}
        <Route path={ROUTE.LOGIN} exact component={Login} />
        <Route path={ROUTE.OTP_VERFICATION} exact component={OtpVerfication} />
        <Route
          path={ROUTE.QUESTION_VERFICATION}
          exact
          component={SecurityQuestionVerfication}
        />
        <Route
          path={ROUTE.OTP_QUESTION_VERFICATION}
          exact
          component={OtpQuestionVerfication}
        />
        <Route path={ROUTE.FORGET_PASSWORD} exact component={ForgetPassword} />
        <Route
          path={ROUTE.RESET_PASSWORD_OTP}
          exact
          component={ResetPasswordOtp}
        />
        <Route path={ROUTE.RESET_PASSWORD} exact component={ResetPassword} />
      </Switch>
    </Router>
  );
}

export default App;
