import React from "react";
import { Container } from "react-bootstrap";
import { HeaderBreadcrumb } from "../../../components";
import { ContractsTabs, Layout } from "../../../Containers";
function Contracts() {
  return (
    <Layout>
      <Container>
        <HeaderBreadcrumb
          mainSection="الرئيسية"
          subSection="تصميم المواقع"
          activeSection="مشاريع تجربة المستخدم"
        />

        <ContractsTabs />
      </Container>
    </Layout>
  );
}

export default Contracts;
