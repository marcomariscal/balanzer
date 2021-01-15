import {
  SHOW_SPINNER,
  END_SHOW_SPINNER,
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
    case SHOW_MESSAGE:
      return { ...state, message: action.msg };
    case RESET_MESSAGES:
      return { ...state, message: null };
    case SHOW_SPINNER:
      return { ...state, loading: true };
    case END_SHOW_SPINNER:
      return { ...state, loading: false };
    default:
      return state;
  }
}
