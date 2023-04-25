import { useIsLoginStore } from "../stores/loginStore";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const { isLogin } = useIsLoginStore();

  return isLogin ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
