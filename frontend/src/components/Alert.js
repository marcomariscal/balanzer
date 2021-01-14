import React from "react";

function Alert({ type, messages }) {
  return <div>{messages.map((m) => m)}</div>;
}

Alert.defaultProps = {
  type: "danger",
  messages: [],
};

export default Alert;
