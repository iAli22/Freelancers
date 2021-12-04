import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PortfolioDescription } from "../../components";
import { Layout, SearchContainer } from "../../Containers";

function Home() {
  return (
    <Layout>
      <Container className="py-4">
        <Row>
          <SearchContainer type="home" />
          <Col lg="2">
            <PortfolioDescription />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Home;
