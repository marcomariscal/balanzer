import React from "react";

function Alert({ message = null }) {
  return <div>{message.map((m) => m)}</div>;
}

Alert.defaultProps = {
  messages: [],
};

export default Alert;
