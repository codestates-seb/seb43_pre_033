import request from "./core";

// get
const getQuestion = url => {
  return request({ url });
};

// post
const postQuestion = (data, url) => {
  return request({
    method: "post",
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "WishJWT token",
    },
  });
};
export { getQuestion, postQuestion };
