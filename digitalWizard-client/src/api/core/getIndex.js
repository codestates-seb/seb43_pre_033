import axios from "axios";

// create an axios instance
const getRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

getRequest.defaults.timeout = 2500;

// req interceptors
getRequest.interceptors.request.use(
  config => config,
  error => {
    console.log(error); // debug
    return Promise.reject(error);
  }
);

// res interceptors
getRequest.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    console.log(error); // debug
    return Promise.reject(error);
  }
);

export default getRequest;
