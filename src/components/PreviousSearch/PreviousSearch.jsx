import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getPevSearch,
  getRelatedCategories,
} from "../../redux/actions/userAction";
import style from "./PreviousSearch.module.scss";
function PreviousSearch({ getPreviousSearch }) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState([]);
  useEffect(() => {
    dispatch(getPevSearch()).then((res) => setSearchResult(res.data.data));
    dispatch(getRelatedCategories()).then((res) =>
      setRelatedCategories(res.data.data)
    );
  }, [dispatch]);

  return (
    <>
      <div className={style.portfolioInfo}>
        {searchResult.length > 0 && (
          <>
            <h1>تم البحث مسبقا</h1>
            <ul>
              {searchResult.map((item, index) => (
                <li key={index}>
                  <div onClick={() => getPreviousSearch(item)}>
                    {item.searched_title}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <h1>أقسامي ذات العلاقة</h1>
        <ul>
          {relatedCategories.length > 0 && (
            <>
              {relatedCategories.map((cate) => (
                <li
                  className={cate.id === +categoryId ? style.active : null}
                  key={cate.id}>
                  <Link to={`/${i18n.language}/home/${cate.id}`}>
                    {cate.category_name}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default PreviousSearch;
