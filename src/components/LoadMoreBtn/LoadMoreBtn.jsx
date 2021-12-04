import React from "react";
import { ArrowDown } from "react-bootstrap-icons";
import style from "./LoadMoreBtn.module.scss";

function LoadMoreBtn({ hasMorePages, getNextPage }) {
  return (
    <div className={style.loadMoreBtn}>
      <button
        className={`${style.loadMore} ${!hasMorePages ? style.disable : ""}`}
        onClick={() => getNextPage()}>
        <span>عرض المزيد</span>
        <ArrowDown />
      </button>
    </div>
  );
}

export default LoadMoreBtn;
