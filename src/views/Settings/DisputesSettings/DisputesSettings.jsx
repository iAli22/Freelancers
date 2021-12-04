import React from "react";
import { DisputesTabs } from "../../../components";
import Settings from "../Settings";
function DisputesSettings() {
  return (
    <Settings currentPage="نزاعاتي">
      <DisputesTabs />
    </Settings>
  );
}

export default DisputesSettings;
