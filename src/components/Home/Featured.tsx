import { useAppSelector } from "../../hooks/hooks";
import { useGetAllBikesQuery } from "../../redux/api/bikeApi";
import FeaturedCard from "./FeaturedCard";
import { TBikeResponse } from "types/types";


const Featured = () => {
    const { searchTerm, brand, year, cc, model } = useAppSelector((state) => state.filter);
    const filterOptions = {searchTerm, brand, year, cc, model}
    const { data } = useGetAllBikesQuery(filterOptions, {
        pollingInterval:50000, 
        skip: false,
        refetchOnMountOrArgChange: true,        
    }); 
     const theme = useAppSelector((state) => state.theme.isDarkMode);
   
    return (
        <div  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-0 my-1 ${theme && "dark"}`}>
             {
                data?.data.map((bike: TBikeResponse, index:number) => <FeaturedCard key={index} bike={bike}></FeaturedCard>)
             }
        </div>
    );
};

export default Featured;