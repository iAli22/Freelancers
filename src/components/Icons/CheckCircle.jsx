import * as React from "react";

function CheckCircle({ dir }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      style={{
        transform: dir === "rtl" && "rotate(180deg)",
      }}>
      <path d='M24 11.999a12 12 0 11-12-12 12 12 0 0112 12zm-13.389 6.354l8.9-8.9a.774.774 0 000-1.095L18.42 7.26a.774.774 0 00-1.095 0l-7.261 7.261-3.39-3.39a.774.774 0 00-1.095 0l-1.095 1.095a.774.774 0 000 1.095l5.032 5.032a.774.774 0 001.095 0z' />
    </svg>
  );
}

export default CheckCircle;
