import React from "react";
import { Alert, Button, message } from "antd";
import { useAppSelector } from "@/Redux/hooks";
import { useSendVerifictionEmailMutation } from "@/Redux/api/authApi";
// import { useRouter } from 'next/router';

const EmailVerificationAlert: React.FC = () => {
  const profileInfo = useAppSelector((state) => state.authReducer.profile);
  const [sendEmail, { isLoading }] = useSendVerifictionEmailMutation();
  // handle send Email verification
  const handleSendVerificationEmail = () => {
    const name = profileInfo?.name as string;
    const email = profileInfo?.email as string;
    sendEmail({ name: name, email: email }).then((res) => {
      if (res?.data?.statusCode == 200) {
        // setIsDisable(true);
        message.success("Verification email sent! Please check your inbox.");
      } else {
        message.error("Failed to send verification email. Please try again.");
      }
    });
  };

  return (
    <Alert
      message="Account Not Verified"
      description="Your account is not verified. Please verify your email to continue."
      type="warning"
      showIcon
      action={
        <Button
          onClick={handleSendVerificationEmail}
          loading={isLoading}
          size="small"
          type="primary"
        >
          Verify Email
        </Button>
      }
      style={{ marginBottom: "20px" }}
    />
  );
};

export default EmailVerificationAlert;
