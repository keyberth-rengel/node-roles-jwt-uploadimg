// constanst
let initialData = {
  fetching: false,
  error: "",
  message: "",
  users: [],
};

export const USERS = "USERS";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_ERROR = "USERS_ERROR";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    //Login
    case USERS:
      return { ...state, fetching: true };
    case USERS_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case USERS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}
