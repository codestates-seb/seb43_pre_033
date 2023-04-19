import request from "./core";

// get
const getQuestion = () => {
  return request({ url: "/question" });
};

// post
const postQuestion = data => {
  return request({
    method: "post",
    url: "/question",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { getQuestion, postQuestion };
