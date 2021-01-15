import {
  SHOW_SPINNER,
  END_SHOW_SPINNER,
  SHOW_MESSAGE,
  RESET_MESSAGES,
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

export function resetMessages() {
  return {
    type: RESET_MESSAGES,
  };
}

export function showMessage(msg) {
  const msgInvalid = msg && msg.text[0].includes("Invalid nonce");
  msg = msgInvalid ? null : msg;
  return {
    type: SHOW_MESSAGE,
    msg,
  };
}
