import React from "react";
import { Accordion, Form } from "react-bootstrap";
import style from "../filterBar.module.scss";
import RatingStar from "../../../components/Icons/RatingStar";
import { useTranslation } from "react-i18next";
function FilterRating({ onFilterChange, selectedRating }) {
  const { t } = useTranslation();
  const checkedData = [
    {
      value: "1",
      dataName: "1 Star",
    },
    {
      value: "2",
      dataName: "2 Stars",
    },
    {
      value: "3",
      dataName: "3 Stars",
    },
    {
      value: "4",
      dataName: "4 Stars",
    },
    {
      value: "5",
      dataName: "5 Stars",
    },
  ];
  const onChangeValue = (e) => {
    const { value } = e.target;
    const label = e.target.attributes["data-name"].value;
    let data = selectedRating !== undefined ? [...selectedRating] : [];
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
    onFilterChange(data, "ratings");
  };
  return (
    <Accordion defaultActiveKey="1" className={style.accordion}>
      <Accordion.Item eventKey="0" className={style.accordion__item}>
        <Accordion.Header className={style.accordion__header}>
          {t("filter.rating")}
        </Accordion.Header>
        <Accordion.Body className={style.accordion__body}>
          {checkedData && (
            <>
              {checkedData.map((item, idx) => (
                <Form.Group className="mb-3" key={`rating-${idx}`}>
                  <Form.Check
                    checked={
                      selectedRating &&
                      selectedRating.find(
                        (selected) => selected.value === item.value
                      )
                    }
                    id={`rating-${idx}`}
                    label={[...Array(+item.value).keys()].map((k, idx) => (
                      <RatingStar key={idx} />
                    ))}
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

export default FilterRating;
