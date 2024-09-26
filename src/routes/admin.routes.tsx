import CreateBike from ".././pages/Admin_Pages/CreateBike";
import AdminDashboard from "../pages/Admin_Pages/AdminDashboard";
import BikeManagement from "../pages/Admin_Pages/BikeManagement";
import CouponManagement from "../pages/Admin_Pages/CouponManagement";
import UserManagement from "../pages/Admin_Pages/UserManagement";
import UploadImageToCloudinary from "../pages/Admin_Pages/UploadImageToCloudinary";
import HeroImageManagement from "../pages/Admin_Pages/HeroImageManagement";
import CreateNewTeam from "../pages/Admin_Pages/CreateNewTeam";
import UserProfilePage from "../pages/user_pages/UserProfilePage";
import RentalsPage from "../pages/Admin_Pages/RentalsPage";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Management",
    children: [
      {
        name: "Admin-Profile",
        path: "admin-profile",
        element: <UserProfilePage />,
      },
      {
        name: "Bike Management",
        path: "bike-management",
        element: <BikeManagement />,
      },
      {
        name: "Booking Management",
        path: "booking-management",
        element: <RentalsPage />,
      },
      {
        name: "Create Bike",
        path: "create-bike",
        element: <CreateBike />,
      },      
      {
        name: "Coupon Management",
        path: "coupon-management",
        element: <CouponManagement />,
      },
      {
        name: "User Management",
        path: "user-management",
        element: <UserManagement />,
      },
      {
        name: "Upload Hero Images",
        path: "upload-hero-images",
        element: <UploadImageToCloudinary />,
      },
      {
        name: "Images Management",
        path: "hero-images-management",
        element: <HeroImageManagement />,
      },
      {
        name: "Create Team Member",
        path: "create-team-member",
        element: <CreateNewTeam />,
      },
    ],
  },
];
