import { useAppSelector } from "../../hooks/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { userToken } from "../../redux/features/authSlice";


const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const token = useAppSelector(userToken);
    return token ? children : <Navigate to="/login" replace={true} />
};

export default ProtectedRoute;