import axios from "axios";

// declare a request interceptor
axios.interceptors.request.use(
  async (config) => {
    // perform a task before the request is sent
    try {
      const token = await localStorage.getItem("token");

      config["headers"] = {
        // Authorization: `Bearer ${token}`,
        Authorization: `${token}`,
      };
      return config;
    } catch (error) {
      return error;
    }
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

export default axios;
