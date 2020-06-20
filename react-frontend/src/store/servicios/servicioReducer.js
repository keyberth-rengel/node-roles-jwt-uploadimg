// constanst
let initialData = {
  fetching: false,
  error: "",
  message: "",
  servicios: [],
  servicio: {},
  search: [],
};

export const SERVICIO = "SERVICIO";
export const SERVICIO_SUCCESS = "SERVICIO_SUCCESS";
export const SERVICIO_ERROR = "SERVICIO_ERROR";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    //Login
    case SERVICIO:
      return { ...state, fetching: true };
    case SERVICIO_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case SERVICIO_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}
