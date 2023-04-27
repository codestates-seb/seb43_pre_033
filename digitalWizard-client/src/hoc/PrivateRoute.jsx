import React from "react";
import { useIsLoginStore } from "../stores/loginStore";
import { Outlet, Navigate } from "react-router-dom";

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const isLogin = () => {
  const email = localStorage.getItem("email");
  return !!email;
};

const PrivateRoute = () => {
  // const { isLogin } = useIsLoginStore();

  if (!isLogin()) {
    alert("로그인이 필요한 기능입니다.");
  }
  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
