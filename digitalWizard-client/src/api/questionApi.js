import request from "./core";
import getRequest from "./core/getIndex";

// get
const getQuestion = url => {
  return getRequest({ url });
};

// post, patch
const postQuestion = (data, url, method = "post") => {
  return request({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });
};

const delQuestion = (url, method = "delete") => {
  return request({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });
};

const postLogin = (data, url, method = "post") => {
  return request({
    method,
    url,
    data,
  });
};

export { getQuestion, postQuestion, delQuestion, postLogin };
