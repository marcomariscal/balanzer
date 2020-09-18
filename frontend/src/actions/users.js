import { FETCH_USERS, FETCH_USER } from "./types";
import { showErrors, startLoad, stopLoad } from "./general";
import BackendAPI from "../components/BackendAPI";

export function getUsersFromAPI() {
  return async function (dispatch) {
    dispatch(startLoad());

    try {
      const response = await BackendAPI.getUsers();
      return dispatch(fetchUsers(response));
    } catch (err) {
      dispatch(showErrors(err.response.data));
    }
    dispatch(stopLoad());
  };
}

function fetchUsers(users) {
  return {
    type: FETCH_USERS,
    users,
  };
}

export function fetchUserFromAPI(username) {
  return async function (dispatch) {
    const response = await BackendAPI.getUser(username);
    return dispatch(fetchUser(response));
  };
}

function fetchUser(user) {
  return {
    type: FETCH_USER,
    user,
  };
}
