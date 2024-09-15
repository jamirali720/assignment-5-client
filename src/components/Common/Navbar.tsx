import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/logo.png";

import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, userToken } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Navbar = () => {
  const token = useAppSelector(userToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = token && verifyToken(token!);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="fixed top-0 left-0 bg-gradient-to-r from-sky-600 to-sky-400  w-screen md:w-full h-auto md:h-[80px] flex justify-center  justify-items-center px-5 z-50">
      <div className="flex w-full h-full justify-between items-center">
        <div className="hidden md:block ">
          <Link to="/" className="cursor-pointer">
            <img
              src={image}
              alt="sports"
              className="bg-white w-20 h-12 rounded-full p-2"
            />
          </Link>
        </div>

        <div>
          <nav>
            <ul className="md:flex justify-center justify-items-center ml-10 md:ml-0 md:space-x-5 ">
              <li>
                <Link
                  to="/"
                  className="font-semibold text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                {user && (
                  <Link
                    to={`/${user["role"]}/dashboard`}
                    className="font-semibold text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                  >
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-semibold text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              {!token ? (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="font-semibold text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="font-semibold text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li onClick={handleLogout}>
                  <Link
                    to=""
                    className="font-semibold text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                  >
                    Logout
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/cart"
                  className="font-semibold text-white text-lg flex justify-center justify-items-center hover:text-[#F45634] duration-300 ease-in-out"
                >
                  <span className="text-white">
                    <FaShoppingCart />
                  </span>
                  <span className="w-6 h-6 relative -top-4 bg-white rounded-full text-center text-sm text-[#F45634] pt-1">
                    0
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
