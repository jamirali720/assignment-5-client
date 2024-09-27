import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { AiFillCheckCircle } from "react-icons/ai";

import { Button } from "antd";
import MetaData from "../MetaData/MetaData";
import {
  useCreateBookingMutation,
  useUpdatedBookingMutation,
} from "../../redux/api/bookingApi";
import { clearCartBooking } from "../../redux/features/cartSlice";
import Spinner from "../../utils/Spinner";

const PaymentSuccess: React.FC = () => {
  const paymentId = new URLSearchParams(location.search).get("payment_intent");
  const navigate = useNavigate();
  const bookingInfo = useAppSelector((state) => state.cart.bookingInfo);
  const { remainingCost, bookingId } = useAppSelector((state) => state.cart);
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [updatedBooking, { isLoading: loading }] = useUpdatedBookingMutation();

  const role = useAppSelector((state) => state.auth.role)
  const handleCompleteBooking = async () => {    
    try {
      const result = await createBooking({ ...bookingInfo, paymentId });
      console.log(result.data);
      if (result?.data?.success) {
        toast.success("Success! You have successfully confirmed your booking", {
          position: "top-center",
        });
        navigate(`/${role}/dashboard`);
        dispatch(clearCartBooking());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      const result = await updatedBooking(bookingId);
      console.log(result.data);
      if (result?.data?.success) {
        toast.success(
          "Success! You have successfully paid and bike return completed",
          {
            position: "top-center",
          }
        );
        navigate("/");
        dispatch(clearCartBooking());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment Success" />
      {isLoading || loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="w-full max-w-full h-screen">
          <div className="w-full h-full flex justify-center justify-items-center md:mt-20">
            <div className="border p-6 shadow-lg ">
              <AiFillCheckCircle
                className="my-5  mx-auto"
                color="green"
                size={70}
              />
              <h3 className="my-3 text-3xl font-semibold text-center">
                {bookingInfo.advanced ? (
                  <span>Thank you for payment of your booking !</span>
                ) : (
                  <span> Thank you for payment of all remaining cost !</span>
                )}
              </h3>
              <p className="text-center text-lg my-5">
                {bookingInfo.advanced ? (
                  <span>
                    Your bike rental is being processed as fast as possible.
                  </span>
                ) : (
                  <span> Thank you. Have a nice day !</span>
                )}
              </p>
              <div className="text-center md:my-5">
                {bookingInfo.advanced ? (
                  <Button
                    type="primary"
                    className="p-5 font-bold text-lg "
                    onClick={handleCompleteBooking}
                  >
                    Confirm Booking
                  </Button>
                ) : remainingCost ? (
                  <Button
                    type={`${theme ? "default" : "primary"}`}
                    className="p-5 font-bold text-lg "
                    onClick={() => handleUpdateBooking()}
                  >
                    Please Update Booking
                  </Button>
                ) : (
                  <Link to="/">
                    <Button
                      className="p-5 font-bold text-lg"
                      type={`${theme ? "default" : "primary"}`}
                    >
                      Go Back To Home
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PaymentSuccess;
