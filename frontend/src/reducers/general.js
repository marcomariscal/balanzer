import {
  SHOW_ERRORS,
  SHOW_SPINNER,
  END_SHOW_SPINNER,
  RESET_ERRORS,
} from "../actions/types";

const INITIAL_STATE = { loading: false, errors: [] };

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_ERRORS:
      return { ...state, errors: action.msgs };
    case RESET_ERRORS:
      return { ...state, errors: [] };
    case SHOW_SPINNER:
      return { ...state, loading: true };
    case END_SHOW_SPINNER:
      return { ...state, loading: false };
    default:
      return state;
  }
}
