import axios from "axios";
import config from "../../config";
import { TALLER, TALLER_ERROR, TALLER_SUCCESS } from "./talleresReducer";

export const fetchTalleresAction = () => async (dispatch, getState) => {
  dispatch({
    type: TALLER,
  });

  try {
    const response = await axios.get(`${config.API_URL}/talleres`);
    dispatch({
      type: TALLER_SUCCESS,
      payload: {
        talleres: response.data.data,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: TALLER_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const getTallerAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: TALLER,
  });

  try {
    const response = await axios.get(`${config.API_URL}/taller/${id}`);
    dispatch({
      type: TALLER_SUCCESS,
      payload: {
        taller: response.data,
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: TALLER_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const createTallerAction = (form) => async (dispatch, getState) => {
  dispatch({
    type: TALLER,
  });

  try {
    const response = await axios.post(`${config.API_URL}/taller`, form);
    dispatch({
      type: TALLER_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: TALLER_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const updateTallerAction = (id, form) => async (dispatch, getState) => {
  dispatch({
    type: TALLER,
  });

  try {
    const response = await axios.update(`${config.API_URL}/taller/${id}`, form);
    dispatch({
      type: TALLER_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: TALLER_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const deleteTallerAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: TALLER,
  });

  try {
    const response = await axios.delete(`${config.API_URL}/taller/${id}`);
    dispatch({
      type: TALLER_SUCCESS,
      payload: {
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: TALLER_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};

export const searchTallerAction = (termino) => async (dispatch, getState) => {
  dispatch({
    type: TALLER,
  });

  try {
    const response = await axios.get(
      `${config.API_URL}/talleres/buscar/${termino}`
    );
    dispatch({
      type: TALLER_SUCCESS,
      payload: {
        search: response.data,
        message: response.message,
      },
    });

    return response;
  } catch (error) {
    dispatch({
      type: TALLER_ERROR,
      payload: { message: "Ha ocurrido un error" },
    });

    return error;
  }
};
