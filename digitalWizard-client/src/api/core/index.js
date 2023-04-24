import axios from "axios";

// create an axios instance
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

request.defaults.timeout = 2500;

// req interceptors
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
    const res = response.data;
    const { authorization, refresh } = response.headers; // 토큰 정보 추출
    authorization && localStorage.setItem("accessToken", authorization);
    refresh && localStorage.setItem("refreshToken", refresh);
    return res;
  },
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // get new token from refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      return request({
        method: "post",
        url: "/members/login",
        data: { refreshToken },
      })
        .then(res => {
          // save new token to localStorage
          const accessToken = res.headers["authorization"]; // 토큰 정보 추출
          const refreshToken = res.headers["refresh"]; // 토큰 정보 추출
          accessToken && localStorage.setItem("accessToken", accessToken);
          refreshToken && localStorage.setItem("refreshToken", refreshToken);

          // update Authorization header and retry original request
          originalRequest.headers.authorization = accessToken;
          return request(originalRequest);
        })
        .catch(error => {
          console.log(error); // debug
          return Promise.reject(error);
        });
    } else {
      console.log(error); // debug
      return Promise.reject(error);
    }
  }
);

export default request;
