import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.scss";
import { Image } from "react-bootstrap";
import searchIcon from "../../../assets/icons/search-icon.svg";
function SearchBar({ onSearch, searchValue }) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    if (searchValue?.length === 0) {
      setTerm("");
    }
  }, [searchValue]);
  return (
    <div className={`input-group ${style.searchBar}`}>
      <form
        className={`input-group ${style.searchBar}`}
        onSubmit={(e) => {
          onSearch(term);
          e.preventDefault();
        }}>
        <input
          onChange={(e) => setTerm(e.target.value)}
          type='search'
          value={term}
          className={`${style.formControl} form-control`}
          placeholder='ابحث عن وظائف'
          aria-label='ابحث عن وظائف'
          aria-describedby='search-addon'
        />
        <button type='submit' className={`${style.btn} btn btn-primary`}>
          <Image src={searchIcon} alt='Icon' />
          ابحث
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
