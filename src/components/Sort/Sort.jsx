import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select from "react-select";
import style from "./Sort.module.scss";

function Sort({ type, getSortValue, list = [], jobs }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {type === "home" && (
        <Link to={`/${i18n.language}/search`}>بحث متقدم</Link>
      )}
      <div className={style.sortContainer}>
        {jobs && <div>عرض {jobs.data.length} وظيفة متاحة لك</div>}
        <div className={style.filter}>
          {/* <span>{t("button.sort")}</span> */}
          <Select
            onChange={(e) => getSortValue(e.value)}
            isSearchable={false}
            placeholder={t("button.sort")}
            options={list.map((option) => {
              return { label: option.name, value: option.key };
            })}
          />
          {/* <Dropdown onSelect={(e) => getSortValue(e)}>
            <Dropdown.Toggle
              className={style.dropdownBtn}
              variant='default'
              id='dropdown-basic'>
              <Image src={filterIcon} fluid />
            </Dropdown.Toggle>

            {list.length > 0 && (
              <Dropdown.Menu>
                {list.map((item, idx) => (
                  <Dropdown.Item
                    className='text-center'
                    key={idx}
                    eventKey={item.key}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
          </Dropdown> */}
        </div>
      </div>
    </>
  );
}

export default Sort;
