import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLineItems } from "../../../redux/actions/commonData";
import style from "../filterBar.module.scss";

function FilterTimeline({ onFilterChange, selectedTimeline }) {
  const { t } = useTranslation();
  const [checkedData, setCheckedData] = useState([]);
  const timelineItems = useSelector((state) => state.commonData.timelineItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimeLineItems());
  }, [dispatch]);

  useEffect(() => {
    let reFormatData = [];
    timelineItems.map((item) =>
      reFormatData.push({
        dataName: item.title,
        value: item.id,
        label: item.title,
      })
    );
    setCheckedData(reFormatData);
  }, [timelineItems]);

  const onChangeValue = (e) => {
    const { value } = e.target;
    const label = e.target.attributes["data-name"].value;
    let data = selectedTimeline !== undefined ? [...selectedTimeline] : [];
    const dataIndex = data.findIndex((item) => item.value === value);
    // 1,2,3
    if (dataIndex !== -1) {
      data.splice(dataIndex, 1);
    } else {
      data.push({
        value,
        label,
      });
    }
    onFilterChange(data, "timeline");
  };

  return (
    <Accordion defaultActiveKey='1' className={style.accordion}>
      <Accordion.Item eventKey='0' className={style.accordion__item}>
        <Accordion.Header className={style.accordion__header}>
          {t("filter.project_timeline")}
        </Accordion.Header>
        <Accordion.Body className={style.accordion__body}>
          {checkedData && (
            <>
              {checkedData.map((item, idx) => (
                <Form.Group className='mb-3' key={`timeLine-${idx}`}>
                  <Form.Check
                    checked={
                      selectedTimeline &&
                      selectedTimeline.find(
                        (selected) => +selected.value === item.value
                      )
                    }
                    id={`timeLine-${idx}`}
                    label={item.label}
                    value={item.value}
                    data-name={item.dataName}
                    onChange={onChangeValue}
                  />
                </Form.Group>
              ))}
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FilterTimeline;
