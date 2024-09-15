import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="w-screen md:w-full md:h-[320px] p-5 mt-2 bg-gradient-to-r from-sky-400 to-sky-600">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:grid-cols-2">
        <div className="m-auto">
          <h1 className="text-bold text-2xl mb-5">Navigation Links </h1>
          <ul className="space-y-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Company</Link>
            </li>
            <li>
              <Link to="/">Products/Services</Link>
            </li>
            <li>
              <Link to="/"> Careers</Link>
            </li>
            <li>
              <Link to="/">Blog/News</Link>
            </li>
            <li>
              <Link to="/"> Sitemap</Link>
            </li>
          </ul>
        </div>
        <div className="m-auto">
          <h1 className="text-bold text-2xl mb-5"> About us </h1>
          <ul className="space-y-2">
            <li>
              <Link to="/"> Our Story / History</Link>
            </li>
            <li>
              <Link to="/"> Mission and Vision</Link>
            </li>
            <li>
              <Link to="/"> Team / Leadership</Link>
            </li>
            <li>
              <Link to="/"> Careers / Join Us</Link>
            </li>
            <li>
              <Link to="/"> Testimonials / Success Stories</Link>
            </li>
            <li>
              <Link to="/"> Awards and Recognition</Link>
            </li>
          </ul>
        </div>
        <div className="m-auto">
          <h1 className="text-bold text-2xl mb-5">Website Links </h1>
          <ul className="space-y-2">
            <li>
              <Link to="/"> Contact Information</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/"> Terms of Service</Link>
            </li>
            <li>
              <Link to="/"> FAQ</Link>
            </li>
            <li>
              <Link to="/about"> About Us</Link>
            </li>
            <li>
              <Link to="/contact"> Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="m-auto">
          <h1 className="text-bold text-2xl mb-5">Social Media</h1>
          <ul className="space-y-2">
            <li>
              <Link
                to="https://www.google.com"
                target="_blank"
                className="flex justify-start justify-items-center gap-3 "
              >
                <span className="text-[#EA4335] ">
                  <FcGoogle size={25} />
                </span>
                <span> Google</span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start justify-items-center gap-3 "
              >
                <span className="text-[#1877F2] hover:text-[#4267B2] ease-in-out duration-300">
                  <FaFacebook size={25} />
                </span>
                <span> Facebook</span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/jamir-ali-36755b1b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start justify-items-center gap-3 "
              >
                <span className="text-[#0A66C2] hover:text-[#000000] ease-in-out duration-300">
                  <FaLinkedin size={25} />
                </span>
                <span> Linkedin</span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com"
                target="_blank"
                className="flex justify-start justify-items-center gap-3 "
              >
                <span className="text-[##F58529] hover:text-[#E1306C] ease-in-out duration-300">
                  <FaInstagram size={25} />
                </span>
                <span> Instagram</span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.twitter.com"
                target="_blank"
                className="flex justify-start justify-items-center gap-3 "
              >
                <span className="text-[#1DA1F2] hover:text-[#14171A] ease-in-out duration-300">
                  <FaTwitter size={25} />
                </span>
                <span> Twitter</span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.youtube.com"
                target="_blank"
                className="flex justify-start justify-items-center gap-3 "
              >
                <span className="text-[#FF0000] hover:text-[#282828] ease-in-out duration-300">
                  <FaYoutube size={25} />
                </span>
                <span> Youtube</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
