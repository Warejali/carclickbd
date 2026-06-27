"use client";
import React, { useState } from "react";
import SignInPage from "@/components/auth/signin";

const LoginPage: React.FC = () => {
  const [authState, setAuthState] = useState<number>(0);

  return (
    <div className="flex h-screen max-w-96 mx-auto">
      <SignInPage setAuthState={setAuthState} />
    </div>
  );
};

export default LoginPage;
