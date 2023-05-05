import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import { useParams } from "react-router";
import ProductRecommendations from "../components/homeComponents/ProductRecommendations";
import { useSelector } from "react-redux";
const HomeScreen = ({ match }) => {
  // window.location.reload();
  const pageId = match.params.pageId;
  const search = match.params.search;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  return (
    <div>
      <Header />
      {userInfo && <ProductRecommendations />}
      <ShopSection pageId={pageId} search={search} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
