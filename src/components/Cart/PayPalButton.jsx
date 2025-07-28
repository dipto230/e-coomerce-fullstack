import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
      <PayPalScriptProvider options={{
          "client-id": "AQiGL_GzscCGLlFNpjnZTaW5sCNToCIvPuyGE0Dvv6kl5elRb97Iw2FPrrokXR2mGYC8fVyTrqwFZ2Rn",
            currency: "USD"
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
