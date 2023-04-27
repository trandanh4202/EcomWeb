import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import { useParams } from "react-router";
const HomeScreen = ({ match }) => {
  // window.location.reload();
  const pageId = match.params.pageId;

  return (
    <div>
      <Header />
      <ShopSection pageId={pageId} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;