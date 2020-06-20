// constanst
let initialData = {
  fetching: false,
  error: "",
  message: "",
  talleres: [],
  taller: {},
  search: [],
};

export const TALLER = "TALLER";
export const TALLER_SUCCESS = "TALLER_SUCCESS";
export const TALLER_ERROR = "TALLER_ERROR";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    //Login
    case TALLER:
      return { ...state, fetching: true };
    case TALLER_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case TALLER_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}
