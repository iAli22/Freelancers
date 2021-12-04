import * as React from "react";
import { useTranslation } from "react-i18next";
function Star(props) {
  const { i18n } = useTranslation();
  return [...Array(5)].map((star, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      width={16.617}
      height={15.795}
      viewBox="0 0 16.617 15.795"
      {...props}
    >
      <defs>
        {i18n.language === "ar" ? (
          <linearGradient id="half_grad">
            <stop offset="50%" stopColor="#bebebe" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffd700" />
          </linearGradient>
        ) : (
          <linearGradient id="half_grad">
            <stop offset="50%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#bebebe" stopOpacity="1" />
          </linearGradient>
        )}
      </defs>
      <path
        d="M8.308 12.7l5.134 3.1-1.358-5.843 4.532-3.929-5.975-.513L8.308 0 5.975 5.509l-5.972.513 4.532 3.929-1.361 5.844z"
        fill={
          Number(props.rate) < index + 1 && Number(props.rate) > index
            ? "url(#half_grad)"
            : Number(props.rate) > index
            ? "#ffd700"
            : "#bebebe"
        }
      />
    </svg>
  ));
}

export default Star;
