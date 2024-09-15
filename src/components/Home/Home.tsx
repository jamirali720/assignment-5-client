import { Fragment } from "react/jsx-runtime";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Hero_Information from "./Hero_Information";
import Featured from "./Featured";

const Home = () => {
  return (
    <Fragment>
      <div className="w-full max-w-full">
        <Navbar />
        <HeroSection />
        <Hero_Information/>
        <Featured/>
        <Testimonials />
        <ContactUs />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
