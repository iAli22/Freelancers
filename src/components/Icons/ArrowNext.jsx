import * as React from "react";

function ArrowNext({ dir }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={8.816}
      height={15.418}
      viewBox='0 0 8.816 15.418'
      style={{
        transform: dir === "rtl" && "rotate(180deg)",
      }}>
      <path
        data-name='Icon ionic-ios-arrow-down'
        d='M.329 7.535V1.876a1.1 1.1 0 010-1.556 1.111 1.111 0 011.561 0L8.5 6.926a1.1 1.1 0 01.032 1.519l-6.643 6.651A1.102 1.102 0 01.328 13.54z'
      />
    </svg>
  );
}

export default ArrowNext;
