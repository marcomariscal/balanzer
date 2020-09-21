import React from "react";
import { useDispatch } from "react-redux";
import "./PrimaryButton.scss";

const PrimaryButton = ({ dispatchFunc, text, disabled }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(dispatchFunc());
  };

  return (
    <button
      className={`PrimaryButton ${disabled && "disabled"}`}
      type="submit"
      onClick={handleClick}
      disabled={disabled && disabled}
    >
      <span>{disabled ? "Enter an amount" : text}</span>
    </button>
  );
};

export default PrimaryButton;
