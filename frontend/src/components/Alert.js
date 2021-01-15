import React from "react";

function Alert({ message }) {
  return <div>{message.map((m) => m)}</div>;
}

Alert.defaultProps = {
  messages: [],
};

export default Alert;
