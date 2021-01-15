import {
  SHOW_ERRORS,
  SHOW_SPINNER,
  END_SHOW_SPINNER,
  SHOW_SUCCESS,
  SHOW_MESSAGE,
  RESET_MESSAGES,
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  errors: [],
  successMsg: null,
  message: null,
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_ERRORS:
      return { ...state, errors: action.msgs };
    case RESET_MESSAGES:
      return { ...state, errors: [], successMsg: null, message: null };
    case SHOW_SPINNER:
      return { ...state, loading: true };
    case END_SHOW_SPINNER:
      return { ...state, loading: false };
    case SHOW_SUCCESS:
      return { ...state, successMsg: action.msg };
    case SHOW_MESSAGE:
      return { ...state, message: action.msg };
    default:
      return state;
  }
}
