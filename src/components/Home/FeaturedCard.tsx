import { Link } from "react-router-dom";

import { Button, Card, Rate } from "antd";
import { TBikeResponse } from "types/types";
import { useAppSelector } from "../../hooks/hooks";

type TBike = {
  bike: TBikeResponse;
};
const FeaturedCard = ({ bike }: TBike) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  return (
    <Card
      className={`w-full max-w-full h-[450px] rounded-sm mx-auto border ${
        theme ? "dark" : "border-[#E7E7E7]"
      }`}
    >
      <div className="flex justify-center justify-items-center">
        <div className="w-full h-full p-1 ">
          <div className="w-full h-40 overflow-hidden">
            <img
              src={bike?.image?.url}
              alt={bike.name}
              className="object-fill w-full h-full hover:scale-110 ease-in-out duration-300 "
            />
          </div>
          <div className="p-3">
            <h1 className="text-start text-lg font-semibold text-[#4096FF]">
              {bike.name}
            </h1>
            <h1 className="text-start text-lg font-semibold text-[#4096FF]">
              {bike.cc}
            </h1>
            <h3 className="text-start font-bold  text-[#0789CB]">
             Price Per Hour $ {bike.pricePerHour}
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
            <div className="py-2 text-slate-700 text-medium">
              <p>
                <strong>Booking status :</strong>
                {bike.isAvailable ? (
                  <span className="mx-3 bg-sky-500 text-white rounded-sm p-1">
                    Available
                  </span>
                ) : (
                  <span className="uppercase bg-red-500 text-white p-1 rounded-sm">
                    on trip
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="p-3 flex justify-between">
            <Link to={`/user/booking-process/${bike._id}`}>
              <Button
                disabled={!bike.isAvailable}
                type={`${theme ? "default" : "primary"}`}
                className="p-5"
              >
                Book Now
              </Button>
            </Link>
            <Link className="block" to={`/bike-details/${bike._id}`}>
              <Button className="p-5" type={`${theme ? "default" : "primary"}`}>
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedCard;
