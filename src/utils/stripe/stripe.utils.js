import { loadStripe } from "@stripe/stripe-js";

// loads our stripe instance w/ our publishable key which identifies our application to stripe as our application
export const stripePromise = loadStripe(
	process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
