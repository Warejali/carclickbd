"use client";

import { FacebookOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function FacebookShareButton() {
  const shareOnFacebook = () => {
    const shareUrl = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}`;

    window.open(
      facebookShareUrl,
      "facebook-share",
      "noopener,noreferrer,width=700,height=700",
    );
  };

  return (
    <Button
      type="primary"
      icon={<FacebookOutlined />}
      onClick={shareOnFacebook}
      aria-label="Share this car on Facebook"
      className="border-none bg-[#1877f2] font-semibold hover:bg-[#166fe5]"
    >
      Share on Facebook
    </Button>
  );
}
