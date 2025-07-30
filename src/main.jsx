import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Stripe setup
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// ⚠️ Replace with your real publishable key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_51RPJYNQvfKHRE0ErZ1Oyye7x1gQMf9HFPqGMcwxTBa6ZECmBeobiDRTOyvdxiimwPsKi4hgg7pPyMYihNBp9RNn400U7FZKBWh')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
)
