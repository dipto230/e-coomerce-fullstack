import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

const PayPalButton = ({ amount, onSuccess, onError }) => {
     console.log("PayPal Client ID: ", import.meta.env.VITE_PAYPAL_CLIENT_ID);
  return (
      <PayPalScriptProvider options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "EUR",
              intent: "capture",
      }}
       
      >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton; 