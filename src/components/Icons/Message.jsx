import * as React from "react";

function Message(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M21.6 0H2.4A2.4 2.4 0 00.012 2.4L0 24l4.8-4.8h16.8a2.407 2.407 0 002.4-2.4V2.4A2.407 2.407 0 0021.6 0zm-2.4 14.4H4.8V12h14.4zm0-3.6H4.8V8.4h14.4zm0-3.6H4.8V4.8h14.4z" />
    </svg>
  );
}

export default Message;
