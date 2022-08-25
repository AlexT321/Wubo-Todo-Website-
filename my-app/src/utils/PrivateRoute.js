import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/context/AuthContext";
const PrivateRoute = () => {
  const { currentUser } = useAuth();
  return (
     currentUser  ? <Outlet/> : <Navigate to="/login"/>
  );
};

export default PrivateRoute;
