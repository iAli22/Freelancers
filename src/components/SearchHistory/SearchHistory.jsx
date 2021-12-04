import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import saveIcon from "../../assets/icons/save.svg";
import save2Icon from "../../assets/icons/save2.svg";
import { getPevSearch, postPevSearch } from "../../redux/actions/userAction";
import { previousSearchValue } from "../../redux/actions/commonData";
import style from "./SearchHistory.module.scss";
import { errorToast, successToast } from "../../helper/toastMessage";

function SearchHistory({ saveFilter }) {
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const [saveSearchFilter, setSaveSearchFilter] = useState([]);
  useEffect(() => {
    dispatch(getPevSearch()).then((res) => setSearchResult(res.data.data));
  }, [dispatch]);

  useEffect(() => {
    setSaveSearchFilter(saveFilter);
  }, [saveFilter]);

  const handleSaveFilter = () => {
    if (saveSearchFilter.search !== "") {
      dispatch(
        postPevSearch({
          title: saveSearchFilter.search,
          data: JSON.stringify({
            timeline: saveSearchFilter.timeline,
            proposal: saveSearchFilter.proposal,
            categoryId: saveSearchFilter.categoryId,
          }),
        })
      )
        .then((res) => {
          successToast(res.data.message);
        })
        .catch((error) => {
          errorToast(error.message);
        });
    }
  };
  return (
    <>
      <button className={style.saveBtn} onClick={() => handleSaveFilter()}>
        <Image src={saveIcon} fluid alt='Icon' />
        حفظ البحث
      </button>
      {searchResult.length > 0 && (
        <div className={style.savedSearch}>
          <h2>
            <Image src={save2Icon} fluid alt='Icon' /> لقد بحثت عن
          </h2>
          <ul>
            {searchResult.map((item, index) => (
              <li key={index}>
                <Link
                  to='#'
                  onClick={() => dispatch(previousSearchValue(item))}>
                  <Search />
                  {item.searched_title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchHistory;
