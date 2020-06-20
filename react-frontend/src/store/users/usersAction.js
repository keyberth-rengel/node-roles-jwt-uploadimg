import axios from "axios";
import config from "../../config";
import { USERS, USERS_ERROR, USERS_SUCCESS } from "./usersReducer";

export const fetchUsersAction = () => async (dispatch, getState) => {
  dispatch({
    type: USERS,
  });

  try {
    const response = await axios.get(`${config.API_URL}/usuarios`);
    dispatch({
      type: USERS_SUCCESS,
      payload: {
        users: response.data.data,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};
