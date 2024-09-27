import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { routerPathGenerator } from "../utils/sidebarItems";
import { userPaths } from "./user.routes";
import Login from "../components/User_Authentication/Login";
import SignUp from "../components/User_Authentication/SignUp";
import Home from "../components/Home/Home";
import AboutUs from "../components/About_Us/AboutUs";
import BikeListingPage from "../components/Bike_Management/BikeListingPage";
import BikeDetailPage from "../components/Bike_Management/BikeDetailPage";
import NotFound from "../components/notFound/NotFound";
import PaymentSuccess from "../components/payment/PaymentSuccess";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/bike-details/:bikeId",
        element: <BikeDetailPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "lists",
        element: <BikeListingPage />,
      },
    ],
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
    path: "/success",
    element: <PaymentSuccess />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


export default router;