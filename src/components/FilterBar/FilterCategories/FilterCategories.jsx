import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import style from "../filterBar.module.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { formatData } from "../../../helper/formatData";
import { getTreeCategories } from "../../../redux/actions/commonData";
import { useTranslation } from "react-i18next";
function FilterCategories({ selectedFilter, onFilterChange }) {
  const treeCategories = useSelector(
    (state) => state.commonData.treeCategories
  );
  const [selectedOption, setSelect] = useState(null);
  const options = formatData(treeCategories);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getTreeCategories());
  }, [dispatch]);

  useEffect(() => {
    setSelect(selectedFilter);
  }, [selectedFilter]);
  const OnChangeFilter = (value) => {
    setSelect(value);
    onFilterChange(value, "categoryId");
  };

  const formatGroupLabel = (data) => (
    <div className={style.groupStyles}>
      <span>{data.label}</span>
      <span className={style.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <Accordion defaultActiveKey='1' className={style.accordion}>
      <Accordion.Item eventKey='0' className={style.accordion__item}>
        <Accordion.Header className={style.accordion__header}>
          {t("filter.categories")}
        </Accordion.Header>
        <Accordion.Body className={style.accordion__body}>
          <Select
            value={selectedOption}
            options={options}
            onChange={OnChangeFilter}
            formatGroupLabel={formatGroupLabel}
            isMulti
            hideSelectedOptions={false}
            controlShouldRenderValue={false}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FilterCategories;
