import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";

import { Button, Card, Rate } from "antd";
import { TBikeResponse } from "types/types";

type TBike = {
  bike: TBikeResponse;
}
const FeaturedCard = ({ bike }:TBike) => {
  const dispatch = useDispatch();

  const handleAddProductToCart = (bike) => {
    dispatch(addToCart(bike));
  };

  return (
    <Card className="w-full max-w-full h-[450px] rounded-sm mx-auto border  border-[#E7E7E7]">
      <div className="flex justify-center justify-items-center">
        <div className="w-full h-full p-1 ">
          <div className="w-full h-48 overflow-hidden">
            <img
              src={bike?.image?.url}
              alt={bike.name}
              className="object-fill w-full h-full hover:scale-110 ease-in-out duration-300 "
            />
          </div>
          <div className="p-3">
            <h1 className="text-start text-1xl font-semibold">{bike.name}</h1>
            <h3 className="text-start font-bold text-green-700">
              Per Hour  $ {bike.pricePerHour}
            </h3>
            <div className="md:flex justify-between justify-items-center gap-1 my-2">
              <Rate
                allowHalf
                count={5}
                disabled
                style={{ fontSize: 16 }}
                value={bike.ratings}
              />
              <span>(Reviews {bike.reviews?.length} ) </span>
            </div>
          </div>
          <div className="p-3 flex justify-between">
            <Button
              type="default"
              className="p-5"
              onClick={() => handleAddProductToCart(bike)}
            >
              Add to Cart
            </Button>
            <Button className="p-5" type="default">
              <Link to={`/bike-details/${bike._id}`}> View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};



export default FeaturedCard;
