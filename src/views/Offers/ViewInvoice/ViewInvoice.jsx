import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  ClientInfo,
  HeaderBreadcrumb,
  ViewInvoiceDetails,
} from "../../../components";
import { Layout } from "../../../Containers";

function ViewInvoice() {
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
            <ClientInfo client={client} type="viewInvoice" />
          </Col>
          <Col lg={9}>
            <ViewInvoiceDetails getClientInfo={getClientInfo} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ViewInvoice;
