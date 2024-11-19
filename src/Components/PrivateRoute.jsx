import { Navigate, Outlet } from "react-router-dom";
import { accessToken } from "../helpingFile";

const PrivateRoute = () => {

  const ACCESS_TOKEN = accessToken
  
  // const accessToken = localStorage.getItem("accessToken");
  return ACCESS_TOKEN ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
