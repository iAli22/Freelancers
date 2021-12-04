import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Select from "react-select";

import { getSkills } from "../../../redux/actions/commonData";
import style from "../filterBar.module.scss";

function FilterSkills({ selectedSkills, onFilterChange }) {
  const { t } = useTranslation();
  const [selectedOption, setSelect] = useState([]);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelect(selectedSkills);
  }, [selectedSkills]);

  const OnChangeFilter = (value) => {
    onSearch(value);
    setSelect(value);
    onFilterChange(value, "skills");
  };

  const onSearch = (term) => {
    dispatch(getSkills(term)).then((res) => {
      let reFormatData = [];
      res.data.data.skills.map((item, idx) =>
        reFormatData.push({
          value: item.name,
          label: item.name,
        })
      );
      setOptions(reFormatData);
    });
  };

  return (
    <Accordion defaultActiveKey="1" className={style.accordion}>
      <Accordion.Item eventKey="0" className={style.accordion__item}>
        <Accordion.Header className={style.accordion__header}>
          {t("filter.skills")}
        </Accordion.Header>
        <Accordion.Body className={style.accordion__body}>
          <Select
            value={selectedOption}
            options={options}
            isMulti
            onChange={OnChangeFilter}
            onInputChange={onSearch}
            hideSelectedOptions={false}
            controlShouldRenderValue={false}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FilterSkills;
