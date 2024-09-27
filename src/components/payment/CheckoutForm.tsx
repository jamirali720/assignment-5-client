import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { TLayout } from "types/types";
import "./CheckoutForm.css";


const CheckoutForm = ({amount}: {amount:number}) => {
  
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");

            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    
  }, [stripe]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url:          
          "https://assignment-5-client-brown.vercel.app/user/payment/success",
      },
    });
   
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ? error.message : "");
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions: TLayout = {
    layout: "tabs",
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="mx-auto my-10 payment-form"
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="formButton"
        disabled={isLoading || !stripe || !elements || amount < 0}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay now - ${amount}`
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
