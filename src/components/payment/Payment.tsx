import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Fragment, useEffect, useState } from "react";
import { ITheme } from "types/types";
import Spinner from "../../utils/Spinner";
import MetaData from "../MetaData/MetaData";
import { useAppSelector } from "../../hooks/hooks";

const initStripe = async () => {
  // Retrieve the publishable key from backend
  const publishableKey = await fetch(
    "http://localhost:5000/api/payment/publishable-key"
  );
  const response = await publishableKey.json();
  return loadStripe(response.publishableKey);
};

const Payment = () => {
  const booking = useAppSelector((state) => state.cart.bookingInfo);
  const remainingCost = useAppSelector((state) => state.cart.remainingCost);

  const [clientSecretSetting, setClientSecretSetting] = useState({
    clientSecret: "",
    loading: true,
  });
  const amount = booking.advanced ? booking.advanced : Math.abs(remainingCost);

  const stripePromise = initStripe();

  useEffect(() => {
    const getClientSecret = async () => {
      const clientSecret = await fetch(
        "https://assignment-5-server-two.vercel.app/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
          }),
        }
      );
      const response = await clientSecret.json();

      if (response.clientSecret) {
        setClientSecretSetting({
          clientSecret: response.clientSecret,
          loading: false,
        });
      }
    };
    getClientSecret();
  }, [amount]);

  if (!clientSecretSetting.clientSecret) {
    return;
  }

  const appearance: ITheme = {
    theme: "stripe",
  };
  const options = {
    clientSecret: clientSecretSetting.clientSecret,
    appearance,
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      {clientSecretSetting.loading ? (
        <div className="w-full h-screen flex justify-center justify-items-center">
          <div className="flex justify-center justify-items-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </Fragment>
  );
};

export default Payment;
