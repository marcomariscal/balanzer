import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import "./PrimaryButton.scss";

const PrimaryButton = ({ dispatchFunc, text }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(dispatchFunc());
  };

  return (
    <Button type="submit" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default PrimaryButton;
