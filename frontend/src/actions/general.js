import {
  SHOW_SPINNER,
  END_SHOW_SPINNER,
  SHOW_ERRORS,
  RESET_ERRORS,
  SHOW_SUCCESS,
  SHOW_MESSAGE,
} from "./types";

export function startLoad() {
  return {
    type: SHOW_SPINNER,
  };
}

export function stopLoad() {
  return {
    type: END_SHOW_SPINNER,
  };
}

export function showErrors(msgs) {
  const errorInvalid = msgs && msgs[0].includes("Invalid nonce");
  msgs = errorInvalid ? [] : msgs;
  return {
    type: SHOW_ERRORS,
    msgs,
  };
}

export function resetErrors() {
  return {
    type: RESET_ERRORS,
  };
}

export function showSuccess(msg) {
  return {
    type: SHOW_SUCCESS,
    msg,
  };
}

export function showMessage(msg) {
  return {
    type: SHOW_MESSAGE,
    msg,
  };
}
