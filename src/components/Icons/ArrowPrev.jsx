import * as React from "react";

function ArrowPrev({ dir }) {
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
        d='M8.487 7.536V1.877a1.1 1.1 0 000-1.556 1.111 1.111 0 00-1.561 0L.321 6.926a1.1 1.1 0 00-.032 1.519l6.638 6.652a1.102 1.102 0 001.56-1.556z'
      />
    </svg>
  );
}

export default ArrowPrev;
