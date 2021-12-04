import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
import style from "../filterBar.module.scss";
import { languagesList } from "../../../helper/languages";
import { useTranslation } from "react-i18next";
function FilterLanguage({ selectedLanguage, onFilterChange }) {
  const { t } = useTranslation();
  const [selectedOption, setSelect] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    let reFormatData = [];
    languagesList.map((item) =>
      reFormatData.push({ value: item.name, label: item.name })
    );
    setOptions(reFormatData);
  }, []);

  useEffect(() => {
    setSelect(selectedLanguage);
  }, [selectedLanguage]);

  const OnChangeFilter = (value) => {
    setSelect(value);
    onFilterChange(value, "language");
  };

  const formatGroupLabel = (data) => (
    <div className={style.groupStyles}>
      <span>{data.label}</span>
      <span className={style.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <Accordion defaultActiveKey="1" className={style.accordion}>
      <Accordion.Item eventKey="0" className={style.accordion__item}>
        <Accordion.Header className={style.accordion__header}>
          {t("filter.languages")}
        </Accordion.Header>
        <Accordion.Body className={style.accordion__body}>
          <Select
            value={selectedOption}
            options={options}
            formatGroupLabel={formatGroupLabel}
            isMulti
            onChange={OnChangeFilter}
            hideSelectedOptions={false}
            controlShouldRenderValue={false}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FilterLanguage;
