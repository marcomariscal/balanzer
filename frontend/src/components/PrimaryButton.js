import React from "react";
import "./PrimaryButton.scss";
import { Spinner } from "react-bootstrap";

const PrimaryButton = ({
  className,
  submitFunc,
  textDisabled,
  textPrimary,
  loadingText,
  disabled,
  loading,
}) => {
  return (
    <button
      className={`PrimaryButton ${className ? className : ""} ${
        disabled ? " disabled" : ""
      }`}
      type="submit"
      onClick={submitFunc}
      disabled={disabled && disabled}
    >
      {loading && (
        <Spinner
          as="span"
          className="mx-2"
          variant="light"
          animation="border"
          size="sm"
        />
      )}
      {!loading ? (
        <span>{disabled ? textDisabled : textPrimary}</span>
      ) : (
        loadingText
      )}
    </button>
  );
};

export default PrimaryButton;
