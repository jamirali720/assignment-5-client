import { setSearchTerm } from "../../redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ChangeEvent } from "react";

const Hero_Information = () => {
  const dispatch = useAppDispatch();
   const theme = useAppSelector((state) => state.theme.isDarkMode);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };
  return (
    <div
      className={`border my-10 ${
        theme && "dark" 
      } `}
    >
      <div className="text-slate-900 text-center py-16 dark:bg-slate-900 dark:text-white">
        <h1 className="text-4xl font-bold">Find a Bike Near You!</h1>
        <p className="mt-4 text-lg">
          Check availability and book your ride today
        </p>
        <div className="w-full mx-auto md:w-2/5">
          <input
            type="text"
            name="search"
            onChange={handleChange}
            className="w-full py-2 mb-5 bg-white border mt-5  indent-4 rounded-lg focus:outline-none text-gray-950 "
            placeholder="Search for a ride today"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero_Information;
