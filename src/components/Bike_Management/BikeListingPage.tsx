import { useGetAllBikesQuery } from "../../redux/api/bikeApi";

import FeaturedCard from "../../components/Home/FeaturedCard";
import { TBikeResponse } from "types/types";
import { Fragment } from "react/jsx-runtime";

import FilterSection from "./FilterSection";
import { useAppSelector } from "../../hooks/hooks";
import Hero_Information from "../../components/Home/Hero_Information";

const BikeListingPage = () => {  
    const {brand, searchTerm, year, model, cc} =  useAppSelector(state => state.filter)
    const filterOptions = {
        brand,
        year,
        model,
        cc, 
        searchTerm,     
    }

  const { data } = useGetAllBikesQuery(filterOptions, {
    pollingInterval: 50000,
    skip: false,
    refetchOnMountOrArgChange: true,     
  });

 
  return (
    <Fragment>
      <div className="mt-32">
        <Hero_Information />
        <FilterSection />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-0 my-1 ">
        {data?.data.map((bike: TBikeResponse, index: number) => (
          <FeaturedCard key={index} bike={bike}></FeaturedCard>
        ))}
      </div>
    </Fragment>
  );
};

export default BikeListingPage;
