import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
const HomeScreen = ({ search, page, categoryId, brandId }) => {
  window.scrollTo(0, 0);

  return (
    <div>
      <Header />
      <ShopSection
        search={search}
        currentPage={page}
        categoryId={categoryId}
        brandId={brandId}
      />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
