import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  // Check if the user is authenticated
  return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
