import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getCountry } from "../../../redux/actions/commonData";
import style from "../filterBar.module.scss";

function FilterLocations({ selectedLocations, onFilterChange }) {
  const { t } = useTranslation();
  const [selectedOption, setSelect] = useState(null);
  const [options, setOptions] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry()).then((res) => {
      let reFormatData = [];
      res.data.data.country_list.map((item) =>
        reFormatData.push({
          value: item.id,
          label: item.name,
        })
      );
      setOptions(reFormatData);
    });
  }, [dispatch]);

  useEffect(() => {
    setSelect(selectedLocations);
  }, [selectedLocations]);

  const OnChangeFilter = (value) => {
    setSelect(value);
    onFilterChange(value, "locationCountry");
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
          {t("filter.locations")}
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

export default FilterLocations;
