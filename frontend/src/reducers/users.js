import { FETCH_USERS } from "../actions/types";

const INITIAL_STATE = {
  allUsers: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, allUsers: action.users };
    default:
      return state;
  }
}
