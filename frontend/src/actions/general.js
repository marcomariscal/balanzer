import {
  SHOW_SPINNER,
  END_SHOW_SPINNER,
  SHOW_ERRORS,
  RESET_ERRORS,
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
