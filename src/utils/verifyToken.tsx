import { jwtDecode } from "jwt-decode";
import { TUserResponse } from "types/types";

export const verifyToken = (token: string) => {
    return  jwtDecode(token) as TUserResponse;      
}