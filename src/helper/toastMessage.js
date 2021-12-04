import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../i18n";

export const successToast = (a) => {
  toast.success(a, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className:
      i18n.language === "ar"
        ? "toastMessage_ar successToastMessage"
        : "toastMessage successToastMessage",
  });
};
export const errorToast = (a) => {
  toast.error(a, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className:
      i18n.language === "ar"
        ? "toastMessage_ar errorToastMessage"
        : "toastMessage errorToastMessage",
  });
};
