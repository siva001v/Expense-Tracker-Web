import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token") ?? null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }
  return false;
};

export const getBearerToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};
