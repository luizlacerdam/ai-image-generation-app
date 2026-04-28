import { getTokenCookie } from "@/utils/authCookies";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  username: string;
  email: string;
}

export function decodeToken(): DecodedToken | null {
  const token = getTokenCookie();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}
