import React from "react";
import { X } from "react-bootstrap-icons";
import style from "./SearchTags.module.scss";
function SearchTags({ tags, onRemoveFilter, onResetFilter }) {
  return (
    <div className={style.searchTag}>
      <ul>
        {Object.keys(tags).map((item) =>
          tags[item].map((tag, index) => (
            <li key={index}>
              {tag.label}
              <X
                onClick={() => {
                  onRemoveFilter(tag.value, item);
                }}
              />
            </li>
          ))
        )}
        {(tags?.categoryId?.length > 0 ||
          tags?.search?.length > 0 ||
          tags?.timeline?.length > 0 ||
          tags?.proposal?.length > 0) && (
          <li
            className={style.resetAll}
            onClick={() => {
              onResetFilter();
            }}
          >
            مسح التصفية
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchTags;
