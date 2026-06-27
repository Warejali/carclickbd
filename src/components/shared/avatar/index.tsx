"use client";
import cn from "@/lib/cn";
import Image from "next/image";
import React from "react";
import avatar1 from "../../../../public/avatar1.png";
import avatar2 from "../../../../public/avatar2.png";
import avatar3 from "../../../../public/avatar3.png";
import avatar4 from "../../../../public/avatar4.png";
import avatar5 from "../../../../public/avatar5.png";

const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

const Avatar: React.FC<{ src?: string; className?: string }> = ({
  src,
  className,
}) => {
  const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

  return (
    <div
      className={cn(
        "text-2xl text-primary w-10 h-10 rounded-full border overflow-hidden",
        className,
      )}
    >
      {src ? (
        <Image
          className="w-full h-full rounded-full object-cover"
          src={src}
          width={400}
          height={400}
          alt="user profile avatar"
        />
      ) : (
        <Image
          className="w-full h-full rounded-full object-cover"
          src={randomAvatar}
          width={400}
          height={400}
          alt="default user avatar"
        />
      )}
    </div>
  );
};

export default Avatar;