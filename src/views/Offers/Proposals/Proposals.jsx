import React from "react";
import { Container } from "react-bootstrap";
import { HeaderBreadcrumb } from "../../../components";
import { ProposalsTabs, Layout } from "../../../Containers";
function Proposals() {
  return (
    <Layout>
      <Container>
        <HeaderBreadcrumb
          mainSection="الرئيسية"
          subSection="تصميم المواقع"
          activeSection="مشاريع تجربة المستخدم"
        />

        <ProposalsTabs />
      </Container>
    </Layout>
  );
}

export default Proposals;
