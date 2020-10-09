import React from "react";
import { Button } from "react-bootstrap";

const Toggle = ({ handleToggle, initialValue, textPrimary, textSecondary }) => {
  const render = initialValue ? textPrimary : textSecondary;
  return (
    <div className="Toggle">
      <Button className="Toggle button" onClick={handleToggle}>
        {render}
      </Button>
    </div>
  );
};

export default Toggle;
