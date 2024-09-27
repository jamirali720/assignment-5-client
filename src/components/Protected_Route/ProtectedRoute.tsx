import { useAppSelector } from "../../hooks/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userToken } from "../../redux/features/authSlice";


const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const token = useAppSelector(userToken);
    const location = useLocation();
    return token ? children : <Navigate to="/login" state={{from:location }} replace={true} />
};

export default ProtectedRoute;