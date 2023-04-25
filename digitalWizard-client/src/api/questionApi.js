import request from "./core";
import getRequest from "./core/getIndex";

// get
const getQuestion = url => {
  return getRequest({ url });
};

const Authorization = localStorage.getItem("accessToken");
// post, patch
const postQuestion = (data, url, method = "post") => {
  return request({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
      Authorization: Authorization,
    },
  }).then(res => console.log(res));
};

const postLogin = (data, url, method = "post") => {
  return request({
    method,
    url,
    data,
  });
};

export { getQuestion, postQuestion, postLogin };
