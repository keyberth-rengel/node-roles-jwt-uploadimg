import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import auth from "./auth/authReducer";
import users from "./users/usersReducer";
import cars from "./vehiculo/vehiculoReducer";
import services from "./servicios/servicioReducer";
import workshops from "./talleres/talleresReducer";

const reducers = combineReducers({
  auth,
  users,
  cars,
  services,
  workshops,
});

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
