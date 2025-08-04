import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export default stripePromise;

// Stripe Connect configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!,
  // Application fee percentage (10% as requested)
  applicationFeePercent: 0.10,
  // Connected account ID - this would typically come from the seller/artist
  // For now, we'll use a placeholder that should be replaced with actual connected account IDs
  connectedAccountId: 'acct_placeholder', // This should be dynamic based on the artist
};

// Helper function to calculate application fee
export const calculateApplicationFee = (amount: number): number => {
  return Math.round(amount * STRIPE_CONFIG.applicationFeePercent);
};

// Helper function to format amount for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};