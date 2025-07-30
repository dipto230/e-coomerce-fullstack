import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const StripeCheckoutForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      onError(error.message);
    } else {
      onSuccess(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Pay ${amount}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
