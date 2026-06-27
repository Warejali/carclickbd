import LandingHomePage from "@/components/publiclayout/home/Page";
import Container from "@/shared/wrapper/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarClickBD | Home ",
  description: "Auction of cool modern cars, trucks SUVs",
};
const HomePage = () => {
  return <LandingHomePage />;
};

export default HomePage;
