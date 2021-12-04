import React from "react";
import { PaymentOptions } from "../../../components";
import Settings from "../Settings";
function PaymentSettings() {
  return (
    <Settings currentPage="اعدادات الدفع">
      <PaymentOptions />
    </Settings>
  );
}

export default PaymentSettings;
