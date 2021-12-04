import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SearchHistory } from "../../components";
import { SearchContainer } from "../../Containers";

import { Layout } from "../../Containers";

function Search() {
  const [saveFilter, setSaveFilter] = useState(null);

  const passFilterToSearchHistory = (e) => {
    setSaveFilter(e);
  };
  return (
    <Layout>
      <Container className='py-4'>
        <Row>
          <SearchContainer
            type='search'
            saveFilterData={passFilterToSearchHistory}
          />
          <Col lg='2'>
            <SearchHistory saveFilter={saveFilter} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Search;
