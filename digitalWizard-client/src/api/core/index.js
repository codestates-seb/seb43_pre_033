import axios from "axios";

// create an axios instance
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

request.defaults.timeout = 2500;

// req interceptors
request.interceptors.request.use(
  config => config,
  error => {
    console.log(error); // debug
    return Promise.reject(error);
  }
);

// res interceptors
request.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    console.log(error); // debug
    return Promise.reject(error);
  }
);

export default request;
