import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  ClientInfo,
  HeaderBreadcrumb,
  SubmitProposalForm,
} from "../../../components";
import { Layout } from "../../../Containers";

function SubmitProposal() {
  const [client, setClient] = useState({});
  const getClientInfo = (client) => {
    setClient(client);
  };

  return (
    <Layout>
      <Container>
        <HeaderBreadcrumb
          mainSection="الرئيسية"
          subSection="تصميم المواقع"
          activeSection="مشاريع تجربة المستخدم"
        />
        <Row>
          <Col lg={3}>
            <ClientInfo client={client} type="submitProposal" />
          </Col>
          <Col lg={9}>
            <SubmitProposalForm getClientInfo={getClientInfo} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SubmitProposal;
