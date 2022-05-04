import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";

const stripePromise = loadStripe()


export default function PaymentCheckout() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
    //   if (!error) {
    //     const { id } = paymentMethod;
    //     elements.getElement(CardElement).clear();
    //   }
    }

    return (
        <Elements stripe={stripePromise}>
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button>Buy</button>
        </form>
        </Elements>
    )
}