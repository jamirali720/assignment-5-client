import { Fragment } from "react/jsx-runtime";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Hero_Information from "./Hero_Information";
import Featured from "./Featured";
import { Outlet, useLocation } from "react-router-dom";
import WhyChoose from "./WhyChoose";


const Home = () => {
  const location = useLocation(); 
   
  if (location.pathname === "/") {
    return (
      <Fragment>
        <div
          className="w-full max-w-full"
        >
          <Navbar />
          <HeroSection />
          <Testimonials/>
          <WhyChoose/>
          <Hero_Information />
          <Featured />
          <Testimonials />
          <ContactUs />
          <Footer />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div
          className="w-full max-w-full"
        >
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </Fragment>
    );
  }
};

export default Home;
