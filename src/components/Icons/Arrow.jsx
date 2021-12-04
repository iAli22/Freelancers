import * as React from "react";

function Arrow({ dir, color = "#000" }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      cursor='pointer'
      width={22.53}
      height={15.588}
      viewBox='0 0 22.53 15.588'
      style={{
        transform: dir === "rtl" && "rotate(180deg)",
      }}>
      <g
        data-name='Icon feather-arrow-left'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}>
        <path data-name='Path 16' d='M1 7.794h20.53' />
        <path data-name='Path 17' d='M15.15 14.173l6.38-6.38-6.38-6.379' />
      </g>
    </svg>
  );
}

export default Arrow;
