import React from "react";
import AuctionProducts from "@/components/product/AuctionProducts";
import MembershipHome from "@/components/membershipTier/MembershipHome";
import HeaderSlider from "./HeaderSlider";
import CarClickBDAutoAuction from "./CarClickBDAutoAuction";
import WhatIsCarClickBD from "./WhatIsCarClickBD";
import RegisterBanner from "./RegisterBanner";
import FollowUs from "./FollowUs";
import PromoTiles from "./PromoTiles";


const LandingHomePage = () => {
  return (
    <div>
      <HeaderSlider />
      <AuctionProducts isShowAll={false} isPaginate={false} isDraft={false} isWinner={false} />
      <MembershipHome />
      <CarClickBDAutoAuction />
      <WhatIsCarClickBD />
      <PromoTiles />
      <FollowUs />
      <RegisterBanner />
      {/* <NewsletterSection /> */}
    </div>
  );
};

export default LandingHomePage;
