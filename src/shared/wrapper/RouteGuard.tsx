"use client";
import { useAppDispatch } from "@/Redux/hooks";
import { setLogOut } from "@/Redux/Slices/authSlice";
import { getTokenInfo } from "@/service/auth.service";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState, useMemo } from "react";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const user = useMemo(() => getTokenInfo(), []);
  const userRole = user?.role;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userRole) {
      router.push("/");
      setIsAuthorized(false);
      return;
    }

    const restrictedRoutes: Record<string, boolean> = {
      "/admin": !(
        userRole === "admin" ||
        userRole === "super-admin" ||
        userRole === "agent" ||
        userRole === "sub-agent"
      ),
      "/admin/create-admin": userRole !== "super-admin",
      "/admin/admins": userRole !== "super-admin",
      "/seller": userRole !== "seller",
      "/customer": userRole !== "customer",
      "/profile": userRole === "admin" || userRole === "super-admin",
    };

    for (const route in restrictedRoutes) {
      if (pathname.startsWith(route) && restrictedRoutes[route]) {
        router.push("/");
        setIsAuthorized(false);
        dispatch(setLogOut());
        return;
      }
    }

    setIsAuthorized(true);
  }, [pathname, router, userRole, dispatch]);

  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <section className="min-h-screen">{children}</section>;
};

export default RouteGuard;
