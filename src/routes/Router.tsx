import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { routerPathGenerator } from "../utils/sidebarItems";
import { userPaths } from "./user.routes";
import Login from "../components/User_Authentication/Login";
import SignUp from "../components/User_Authentication/SignUp";
import Home from "../components/Home/Home";
import BIkeDetails from "../components/Home/BIkeDetails";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routerPathGenerator(adminPaths),
  },

  {
    path: "/user",
    element: <App />,
    children: routerPathGenerator(userPaths),
  },
  {   
    path: "bike-details/:bikeId",
    element: <BIkeDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);


export default router;