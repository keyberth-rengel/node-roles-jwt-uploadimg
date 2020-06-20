// constanst
let initialData = {
  fetching: false,
  error: "",
  message: "",
  vehiculos: [],
  vehiculo: {},
  search: [],
};

export const VEHICULO = "VEHICULO";
export const VEHICULO_SUCCESS = "VEHICULO_SUCCESS";
export const VEHICULO_ERROR = "VEHICULO_ERROR";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    //Login
    case VEHICULO:
      return { ...state, fetching: true };
    case VEHICULO_SUCCESS:
      return { ...state, fetching: false, ...action.payload };
    case VEHICULO_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}
