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
      //   "WishJWT eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlckVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwic3ViIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjgyMDA2NTg2LCJleHAiOjE2ODIwMDgzODZ9.P1TzkkxHjcytIPQsINB_P68JQdFmY-IfFGy3FRmoQhI",
    },
  });
};
export { getQuestion, postQuestion };
