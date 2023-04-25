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
    // if (token) {
    //   config.headers.authorization = token;
    // }

    const refreshToken = localStorage.getItem("refreshToken");
    if (config.url === "/refresh") {
      config.headers.authorization = refreshToken;
    }

    if (token && config.url !== "/members/login" && config.url !== "/refresh") {
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
  response =>
    response.config.url === "/members/login" ? response.headers : response.data,
  error => {
    // console.log(error);
    const originalRequest = error.config;
    // originalRequest._retry = true;
    console.log(originalRequest._retry);
    // if (error.response.status === 401) {
    //   // 백엔드에서 액세스 토큰을 안준다,,?
    //   // get new token from refresh token
    // ! 로컬스토리지 삭제하기
    //   const refreshToken = localStorage.getItem("refreshToken");
    //   return request({
    //     method: "post",
    //     url: "/refresh",
    //     // refresh 토큰이 있는데 일치하지 않을때
    //     // 탈출조건
    //   })
    //     .then(res => {
    //       // save new token to localStorage
    //       const accessToken = res.headers["authorization"]; // 토큰 정보 추출
    //       const refreshToken = res.headers["refresh"]; // 토큰 정보 추출
    //       accessToken && localStorage.setItem("accessToken", accessToken);
    //       refreshToken && localStorage.setItem("refreshToken", refreshToken);
    //       // update Authorization header and retry original request
    //       originalRequest.headers.authorization = accessToken;
    //       return request(originalRequest);
    //     })
    //     .catch(error => {
    //       console.log(error); // debug
    //       return Promise.reject(error);
    //     });
    // } else {
    //   console.log(error); // debug
    //   return Promise.reject(error);
    // }
  }
);

export default request;
