import React from "react";
import FreshChat from "react-freshchat";
import { useSelector } from "react-redux";
function FreshChatContainer() {
  const user = useSelector((state) => state.user?.user?.profile);
  return (
    <>
      {user?.first_name && (
        <FreshChat
          token={process.env.REACT_APP_FRESHCHAT}
          firstName={user?.first_name}
          lastName={user?.last_name}
          email={user?.email}
          phone={user?.phone}
          onInit={(widget) => {
            widget.user.setProperties({
              email: user?.email,
              first_name: user?.first_name,
              firstName: user?.first_name,
              last_name: user?.last_name,
              lastName: user?.last_name,
              phone: user?.phone,
            });
          }}
        />
      )}
      {!user?.first_name && (
        <FreshChat token={process.env.REACT_APP_FRESHCHAT} />
      )}
    </>
  );
}

export default FreshChatContainer;
