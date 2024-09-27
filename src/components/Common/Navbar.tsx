import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/logo.png";
import Switch from "react-switch";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, userToken } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { toggleDarkMode } from "../../redux/features/themeSlice";

const Navbar = () => {
  const token = useAppSelector(userToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = token && verifyToken(token!);
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const onChange = () => {  
   dispatch(toggleDarkMode());
  };
  return (
    <header
      className={`fixed top-0 left-0 border-b  w-screen md:w-full h-auto md:h-[80px] flex justify-center  justify-items-center px-5 z-50 ${
        theme && "dark" 
      }`}
    >
      <div className="flex w-full h-full justify-between items-center dark:bg-black dark:text-white ">
        <div className="hidden md:block ">
          <Link to="/" className="cursor-pointer">
            <img
              src={image}
              alt="sports"
              className=" w-20 h-12 rounded-full p-2"
            />
          </Link>
        </div>

        <div>
          <nav>
            <ul className="md:flex justify-center justify-items-center ml-10 md:ml-0 md:space-x-5 ">
              <li>
                <Link
                  to="/"
                  className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                {user && (
                  <Link
                    to={`/${user["role"]}/dashboard`}
                    className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                  >
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                <Link
                  to="/lists"
                  className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  Bike Lists
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              {!token ? (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li onClick={handleLogout}>
                  <Link
                    to=""
                    className="font-semibold  dark:text-white text-lg hover:text-[#F45634]  duration-300 ease-in-out"
                  >
                    Logout
                  </Link>
                </li>
              )}
              <li>
                <Switch onChange={onChange} checked={theme} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
