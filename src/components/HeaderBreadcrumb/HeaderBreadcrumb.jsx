import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function HeaderBreadcrumb({ mainSection, subSection, activeSection }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
        {mainSection}
      </Breadcrumb.Item>
      <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/home" }}>
        {subSection}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{activeSection}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default HeaderBreadcrumb;
