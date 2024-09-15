import BookingProcess from "../pages/user_pages/BookingProcess";
import MyRentalsPage from "../pages/user_pages/MyRentalsPage";
import UserDashboard from "../pages/user_pages/UserDashboard";
import UserProfilePage from "../pages/user_pages/UserProfilePage";



export const userPaths = [
    {
        name: "Dashboard", 
        path: "dashboard", 
        element: <UserDashboard/>
    }, 
    {
        name: "Bike Management", 
        children: [
            {
                name: "User profile", 
                path: "user-profile",                
                element: <UserProfilePage/>
            },
            {
                name: "My rentals", 
                path: "my-rentals",  
                element: <MyRentalsPage/>
            },
            {
                name: "Booking process", 
                path: "booking-process",  
                element: <BookingProcess/>
            },
            
        ]
    }
]