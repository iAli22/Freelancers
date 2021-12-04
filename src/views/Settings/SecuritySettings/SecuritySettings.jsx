import React from "react";
import { SecurityOptions } from "../../../components";
import Settings from "../Settings";
function SecuritySettings() {
  return (
    <Settings currentPage="كلمة المرور والآمان">
      <SecurityOptions />
    </Settings>
  );
}

export default SecuritySettings;
