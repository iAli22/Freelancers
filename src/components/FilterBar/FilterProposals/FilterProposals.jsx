import React, { useEffect } from "react";
import { Accordion, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getProposalList } from "../../../redux/actions/commonData";
import { useDispatch, useSelector } from "react-redux";
import style from "../filterBar.module.scss";

function FilterProposals({ onFilterChange, selectedProposal }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const proposalList = useSelector((state) => state.commonData.proposalList);

  useEffect(() => {
    dispatch(getProposalList());
  }, [dispatch]);

  const onChangeValue = (e) => {
    const { value } = e.target;
    const label = e.target.attributes["data-name"].value;
    let data = selectedProposal !== undefined ? [...selectedProposal] : [];
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
    onFilterChange(data, "proposal");
  };

  return (
    <Accordion defaultActiveKey='1' className={style.accordion}>
      <Accordion.Item eventKey='0' className={style.accordion__item}>
        <Accordion.Header className={style.accordion__header}>
          {t("filter.num_proposals")}
        </Accordion.Header>
        <Accordion.Body className={style.accordion__body}>
          {proposalList && (
            <>
              {proposalList.map((item, idx) => (
                <Form.Group className='mb-3' key={`proposal-${idx}`}>
                  <Form.Check
                    checked={
                      selectedProposal &&
                      selectedProposal.find(
                        (selected) => selected.value === item.value
                      )
                    }
                    id={`proposal-${idx}`}
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

export default FilterProposals;
