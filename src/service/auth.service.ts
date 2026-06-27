"use client";
import { useRouter } from "next/navigation";
import { authInfoKey, authKey, PROFILE_INFO_KEY } from "@/constant/storegeKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";
import {
  getFromLocalStorage,
  getFromLocalStorageAsParse,
  setToLocalStorage,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";
import { jwtDecode } from "jwt-decode";

// Store the access token in localStorage
export const storeToken = ({ accessToken }: { accessToken: string }) => {
  const tokenWithBearer = `Bearer ${accessToken}`;
  return localStorage.setItem(authKey, tokenWithBearer);
};

// Handle login
export const handleLoggedIn = (token: string) => {
  storeToken({ accessToken: token });
};

// Check if user is logged in and validate token expiration
export const isLoggedIn = () => {
  const token = getFromLocalStorage(authKey);
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token.split(" ")[1] as string);
    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      Logout(); // Log out if the token is expired
      return false;
    }
    return true;
  } catch (error) {
    Logout();
    return false;
  }
};

// Get token information and check expiration
export const getTokenInfo = (): any => {
  if (isLoggedIn()) {
    const token = getFromLocalStorage(authKey);
    if (!token) return null;

    const tokenInfo = getFromLocalStorageAsParse(authInfoKey);
    if (tokenInfo) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenInfo.exp && tokenInfo.exp < currentTime) {
        Logout(); // Log out if token is expired
        return null;
      }
      return tokenInfo;
    }

    try {
      const userDecodedData = jwtDecode(token.split(" ")[1] as string);
      if (userDecodedData.exp && userDecodedData.exp < Math.floor(Date.now() / 1000)) {
        Logout(); // Log out if token is expired
        return null;
      }
      setToLocalStorageAsStringify(authInfoKey, userDecodedData);
      return userDecodedData;
    } catch (error) {
      Logout();
      return null;
    }
  }
  return null;
};

// Handle Logout and redirect to login page
export const Logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PROFILE_INFO_KEY);
    localStorage.removeItem(authKey);
    localStorage.removeItem(authInfoKey);

    // Redirect to login page
    window.location.href = "/login"; 
  }
};

// Remove token info by key
export const removetokenInfo = (key: string) => {
  return localStorage.removeItem(key);
};

// Refresh access token
export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance({
      url: `${getBaseUrl()}/auth/get-new-accessToken`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data?.accessToken) {
      storeToken({ accessToken: response.data.accessToken });
      return response.data.accessToken;
    } else {
      Logout(); // Log out if token refresh fails
      return null;
    }
  } catch (error) {
    Logout();
    return null;
  }
};

// Get access token (example hardcoded token for testing, replace with actual logic)
export const getAccessToken = async () => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY4NTQyOTY3NzFjOTk5MDQzOGM5ZmEiLCJyb2xlIjoiY3VzdG9tZXIiLCJlbWFpbCI6Im1hc3VtLnJhbmFAZ21haWwuY29tIiwic2VsbGVyVHlwZSI6InByaXZhdGUiLCJpc0VtYWlsVmVyaWZpZWQiOmZhbHNlLCJhY2NvdW50VHlwZSI6InBlcnNvbmFsIiwiaWF0IjoxNzM1MDE5MDg2LCJleHAiOjE3NjY1NTUwODZ9.mP6JS6jyKWg_B9473URzmJRtbYRQJ_OMqdkBe6LEv5U";
  if (accessToken) {
    return accessToken;
  }
  return null;
};
