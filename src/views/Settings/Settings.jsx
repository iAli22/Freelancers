import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HeaderBreadcrumb, SettingOptions } from "../../components";
import { Layout } from "../../Containers";

function Settings({ currentPage = "", children }) {
  return (
    <Layout>
      <Container>
        <HeaderBreadcrumb
          mainSection="الرئيسية"
          subSection="الإعدادات"
          activeSection={currentPage}
        />
        <Row>
          <Col lg={3}>
            <SettingOptions />
          </Col>
          <Col lg={9}>{children}</Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Settings;
