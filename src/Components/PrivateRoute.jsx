import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Retrieve the accessToken from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Allow access if accessToken exists; otherwise, redirect to login
  return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
