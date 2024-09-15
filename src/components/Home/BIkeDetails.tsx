import { Fragment, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../hooks/hooks";

import Description from "./Description";
import ReviewsCard from "../Reviews/ReviewsCard";

import ReviewModal from "../Reviews/ReviewModal";
import Spinner from "../../utils/Spinner";
import { Button } from "antd";
import MetaData from "../MetaData/MetaData";
import { useGetSingleBikesQuery } from "../../redux/api/bikeApi";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import { TReview } from "types/types";


const BIkeDetails = () => {
  const { bikeId } = useParams();
  const [show, setShow] = useState(true);



  const { data, isLoading, isError, error } = useGetSingleBikesQuery(
    bikeId!
  );

  console.log(data);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(data?.data));
  };

  useEffect(() => {
    if (isError) {
      toast.error(error as ReactNode, { position: "top-center" });
    }
   
  }, [isError, error]);

  console.log(data);
  return (
    <Fragment>
      <MetaData title="BIke details" />
      {isLoading ? (
        <div className=" w-full h-screen ">
          <Spinner />
        </div>
      ) : (
        <main className="bg-[#FFFFFF]">
          <div className="w-full h-full grid md:grid-cols-2 bg-[#FFFFFF] sm: grid-cols-1 ">
            <section className=" w-full max-h-full max-w-full md:h-full shadow-md">
              <div className="h-full">
                <img
                  src={data?.data.image.url}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
            </section>
            <section className="p-10 md:h-full shadow-md">
              <div className="py-2 text-slate-700 text-3xl">
                <h1 className="text-red-500">
                  <strong> Bike Name :</strong> {data?.data.name}
                </h1>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Bike Model :</strong> {data?.data.model}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Bike Brand :</strong> {data?.data.brand}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Bike CC :</strong> {data?.data.cc}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong> Bike Ratings : </strong>
                  {data?.data.ratings ? (
                    <span>
                      {data?.data.ratings.toFixed(2)}
                      <span className="ml-3">
                        Reviews (
                        {data?.data.reviews && data?.data.reviews.length})
                      </span>
                    </span>
                  ) : (
                    <span> No reviews</span>
                  )}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Price Per Hour :</strong> {data?.data.pricePerHour}
                </p>
              </div>
              <div className="py-2 text-slate-700 text-lg">
                <p>
                  <strong>Year :</strong> {data?.data.year}
                </p>
              </div>

              <div className="md:w-2/5 py-2">
                <Button
                  type="default"
                  onClick={handleAddToCart}
                  className="uppercase p-5"
                >
                  Add to Cart
                </Button>
              </div>
              <div className="w-2/5 h-10 my-10">
                {bikeId && <ReviewModal id={bikeId} />}
              </div>
            </section>
          </div>

          {/* description section */}
          <section className="w-full h-auto shadow-md my-5 ">
            <div className="max-w-full md:w-11/12 mx-auto max-h-screen p-6">
              <div className=" flex justify-start mb-8 space-x-4 ">
                <Button
                  type="default"
                  className="text-xl uppercase font-semibold p-5"
                  onClick={() => setShow(true)}
                >
                  Description
                </Button>
                <Button
                  className="text-xl uppercase font-semibold p-5"
                  onClick={() => setShow(false)}
                >
                  Review ({data?.data.reviews && data?.data.reviews.length})
                </Button>
              </div>
              <div className=" w-full h-full">
                {show ? (
                  <Description description={data?.data.description} />
                ) : (
                  <div className="">
                    {data?.data.reviews && data.data.reviews?.length > 0 ? (
                      <div className="overflow-x-scroll md:flex justify-center justify-items-center ">
                        {data?.data.reviews?.map((review: TReview) => {
                          return <ReviewsCard review={review} />;
                        })}
                      </div>
                    ) : (
                      <div> No Review yet</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}
    </Fragment>
  );
};

export default BIkeDetails;
