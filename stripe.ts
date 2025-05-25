import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
// In production, this would be an environment variable
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key';

export const stripePromise = loadStripe(stripePublishableKey);

// Credit package definitions that match Stripe products
export const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    description: '50 credits per month',
    creditAmount: 50,
    priceInCents: 49900, // $499.00
    features: [
      'E-learning modules',
      'PDF job aids',
      'Minor updates included (60 days)',
      'Email support'
    ],
    stripeProductId: 'prod_starter',
    stripePriceId: 'price_starter'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: '150 credits per month',
    creditAmount: 150,
    priceInCents: 129900, // $1,299.00
    features: [
      'All Starter features',
      'Avatar-based explainer videos',
      'Interactive process maps',
      'Priority support'
    ],
    stripeProductId: 'prod_professional',
    stripePriceId: 'price_professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: '500+ credits per month',
    creditAmount: 500,
    priceInCents: 399900, // $3,999.00
    features: [
      'All Professional features',
      'Volume discounts',
      'Dedicated account manager',
      'Custom branding',
      'API access'
    ],
    stripeProductId: 'prod_enterprise',
    stripePriceId: 'price_enterprise'
  }
];

// Asset type credit costs
export const ASSET_CREDIT_COSTS = {
  'e-learning': 10,
  'video': 15,
  'process-map': 8,
  'job-aid': 5
};

// Helper functions for Stripe integration
export const formatAmountForDisplay = (
  amount: number,
  currency: string = 'USD'
): string => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount / 100);
};

export const formatAmountForStripe = (
  amount: number,
  currency: string = 'USD'
): number => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === 'fraction') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};
