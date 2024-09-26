import { jwtDecode } from "jwt-decode";
import { TDecodedResult } from "types/types";

export const verifyToken = (token: string) => {
    return jwtDecode(token) as TDecodedResult;  
}