// constanst
let initialData = {
  loggedIn: false,
  fetching: false,
  error: "",
  message: "",
  user: {},
  token: "",
};

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOADING = "LOADING";
export const LOGOUT = "LOGOUT";

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    //Login
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOADING:
      return { ...state, fetching: false, ...action.payload };

    //register
    case REGISTER:
      return { ...state, fetching: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
        error: "",
      };
    case REGISTER_ERROR:
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
        error: action.payload.message,
      };
    //logout
    case LOGOUT:
      return { ...state, fetching: false, ...action.payload };

    //update user
    case UPDATE_PROFILE:
      return { ...state, fetching: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, fetching: false, ...action.payload, error: "" };
    case UPDATE_PROFILE_ERROR:
      return { ...state, fetching: false, message: action.payload.message };

    //change password
    case CHANGE_PASSWORD:
      return { ...state, fetching: true, ...action.payload };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, fetching: false, message: action.payload.message };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, fetching: false, message: action.payload.message };

    default:
      return state;
  }
}
