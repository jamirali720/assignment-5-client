import UpdateBIke from "../pages/Admin_Pages/UpdateBike";
import CreateBike from ".././pages/Admin_Pages/CreateBike";
import AdminDashboard from "../pages/Admin_Pages/AdminDashboard";
import AdminProfile from "../pages/Admin_Pages/AdminProfile";
import BikeManagement from "../pages/Admin_Pages/BikeManagement";
import CouponManagement from "../pages/Admin_Pages/CouponManagement";
import UserManagement from "../pages/Admin_Pages/UserManagement";
import UploadImageToCloudinary from "../pages/Admin_Pages/UploadImageToCloudinary";
import HeroImageManagement from "../pages/Admin_Pages/HeroImageManagement";

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
        element: <AdminProfile />,
      },
      {
        name: "Bike Management",
        path: "bike-management",
        element: <BikeManagement />,
      },
      {
        name: "Create Bike",
        path: "create-bike",
        element: <CreateBike />,
      },
      
      {
        name: "Update Bike",
        path: "update-bike/:id",
        element: <UpdateBIke />,
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
    ],
  },
];
