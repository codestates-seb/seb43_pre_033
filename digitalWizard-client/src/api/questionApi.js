import request from "./core";

// get
const getQuestion = url => {
  return request({ url });
};

// post, patch
const postQuestion = (data, url, method = "post") => {
  return request({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      // Authorization:
      //   "WishJWT eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlckVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwic3ViIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjgxOTIzMTcyLCJleHAiOjE2ODE5MjQ5NzJ9.tKVCqyW6TUj-OV6Zr2Kamb6EqA2KuJ6QEG2bfOThlJY",
    },
  });
};

export { getQuestion, postQuestion };
