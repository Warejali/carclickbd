"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "@/Interface/user";
import { useAppSelector } from "@/Redux/hooks";
import ProfileInfo from "./ProfileInfo";

const ProfileComponentPage = () => {
  const profileInfo = useAppSelector((state) => state.authReducer.profile);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg lg:py-3 mb-5">
      <div className="border-b-2 border-primary px-2 py-1 mb-3">
        <h3 className="font-semibold">{profileInfo?.name}</h3>
      </div>
      <div className="w-full md:w-[50%] py-3">
        <ProfileInfo user={profileInfo as IUser} />
      </div>
    </div>
  );
};

export default ProfileComponentPage;
