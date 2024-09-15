import { useAppSelector } from "../../hooks/hooks";
import { useGetAllBikesQuery } from "../../redux/api/bikeApi";
import FeaturedCard from "./FeaturedCard";
import { TBikeResponse } from "types/types";


const Featured = () => {
    const searchQuery = useAppSelector(state=> state.filter.searchTerm)
    const { data } = useGetAllBikesQuery(searchQuery) 
    console.log(data)
    return (
        <div  className="grid grid-cols-1 md:grid-cols-4 gap-4 z-0">
             {
                data?.data.map((bike: TBikeResponse, index:number) => <FeaturedCard key={index} bike={bike}></FeaturedCard>)
             }
        </div>
    );
};

export default Featured;