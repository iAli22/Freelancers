import * as React from "react";

function Favorite({ isFavorite, to }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={32}
      height={29.875}
      cursor='pointer'
      viewBox='0 0 32 29.875'>
      <path
        data-name='Icon material-favorite'
        d='M16 28.525l-2.175-1.98C6.1 19.54 1 14.92 1 9.25A8.17 8.17 0 019.25 1 8.983 8.983 0 0116 4.135 8.983 8.983 0 0122.75 1 8.17 8.17 0 0131 9.25c0 5.67-5.1 10.29-12.825 17.31z'
        fill={isFavorite ? "#00c7d4" : "none"}
        stroke='#00c7d4'
        strokeWidth={2}
      />
    </svg>
  );
}

export default Favorite;
