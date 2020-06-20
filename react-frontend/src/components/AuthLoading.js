import React, { useEffect } from "react";
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import { fetchVehiculosAction } from "../store/vehiculo/vehiculoAction";
import { fetchUsersAction } from "../store/users/usersAction";
import { fetchServiciosAction } from "../store/servicios/servicioAction";
import { fetchTalleresAction } from "../store/talleres/talleresAction";

import { loading } from "../store/auth/authAction";
function AuthLoading(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchVehiculosAction());
      dispatch(fetchUsersAction());
      dispatch(fetchServiciosAction());
      dispatch(fetchTalleresAction());
    } else if (!auth.token) {
      dispatch(loading(localStorage.getItem("token")));
    }
  }, [auth.token, dispatch]);

  return auth.fetching ? <CircularLoading /> : props.children;
}

export default AuthLoading;
