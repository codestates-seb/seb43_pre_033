import axios from "axios";
import jwt_decode from "jwt-decode";

// create an axios instance
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 2500,
});

// req interceptors
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (
      token &&
      config.url !== "/members/login" &&
      config.url !== "/members/signup" &&
      config.url !== "/refresh"
    ) {
      config.headers.authorization = token;
    }

    return config;
  },
  error => {
    console.log(error); // debug
    return Promise.reject(error);
  }
);

// res interceptors
request.interceptors.response.use(
  response => {
    return response.config.url === "/members/login" ||
      response.config.url === "/members/signup" ||
      response.config.url === "/refresh"
      ? response.headers
      : response.data;
  },
  error => {
    console.log(error);
    const originalRequest = error.config;

    if (error.response.status === 401 && isExpired()) {
      // get new token from refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      return request({
        method: "post",
        url: "/refresh",
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          refresh: refreshToken,
        },
      })
        .then(res => {
          const { authorization } = res;

          // save new token to localStorage
          console.log(authorization);
          authorization && localStorage.setItem("accessToken", authorization);

          // update Authorization header and retry original request
          originalRequest.headers.authorization = authorization;
          originalRequest.retry = true; // set retry flag
          return request(originalRequest); // retry
        })
        .catch(error => {
          console.log(error); // debug
          return Promise.reject(error);
        });
    } else {
      console.log(error); // debug
      console.log(error.response.data); // debug
      return Promise.reject(error);
    }
  }
);

function isExpired() {
  const token = localStorage.getItem("accessToken");
  const currentTime = Date.now() / 1000;
  const decodeToken = jwt_decode(token);
  return decodeToken.exp < currentTime ? true : false;
}

export default request;
