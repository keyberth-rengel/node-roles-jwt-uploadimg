import axios from "axios";
import config from "../../config";
import { VEHICULO, VEHICULO_ERROR, VEHICULO_SUCCESS } from "./vehiculoReducer";

export const fetchVehiculosAction = () => async (dispatch, getState) => {
  dispatch({
    type: VEHICULO,
  });

  try {
    const response = await axios.get(`${config.API_URL}/vehiculos`);
    dispatch({
      type: VEHICULO_SUCCESS,
      payload: {
        vehiculos: response.data.data,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: VEHICULO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const getVehiculoAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: VEHICULO,
  });

  try {
    const response = await axios.get(`${config.API_URL}/vehiculo/${id}`);
    dispatch({
      type: VEHICULO_SUCCESS,
      payload: {
        vehiculo: response.data,
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: VEHICULO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const createVehiculoAction = (form) => async (dispatch, getState) => {
  dispatch({
    type: VEHICULO,
  });

  try {
    const response = await axios.post(`${config.API_URL}/vehiculo`, form);
    dispatch({
      type: VEHICULO_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: VEHICULO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const updateVehiculoAction = (id, form) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: VEHICULO,
  });

  try {
    const response = await axios.update(
      `${config.API_URL}/vehiculo/${id}`,
      form
    );
    dispatch({
      type: VEHICULO_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: VEHICULO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const deleteVehiculoAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: VEHICULO,
  });

  try {
    const response = await axios.delete(`${config.API_URL}/vehiculo/${id}`);
    dispatch({
      type: VEHICULO_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: VEHICULO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const searchVehiculoAction = (termino) => async (dispatch, getState) => {
  dispatch({
    type: VEHICULO,
  });

  try {
    const response = await axios.get(
      `${config.API_URL}/vehiculos/buscar/${termino}`
    );
    dispatch({
      type: VEHICULO_SUCCESS,
      payload: {
        search: response.data,
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: VEHICULO_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};
