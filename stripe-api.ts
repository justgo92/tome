// This file contains API routes for Stripe integration
// It will be used to create and manage Stripe products, prices, and checkout sessions

import { CREDIT_PACKAGES } from '@/lib/stripe';
import Stripe from 'stripe';

// Initialize Stripe with secret key
// In production, this would be an environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_your_key';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16', // Use the latest API version
});

// Function to create Stripe products and prices based on our credit packages
export async function createStripeProducts() {
  try {
    // Create each product and its price in Stripe
    for (const pkg of CREDIT_PACKAGES) {
      // Check if product already exists
      let product;
      try {
        product = await stripe.products.retrieve(pkg.stripeProductId);
        console.log(`Product ${pkg.name} already exists in Stripe`);
      } catch (error) {
        // Create the product if it doesn't exist
        product = await stripe.products.create({
          id: pkg.stripeProductId,
          name: pkg.name,
          description: pkg.description,
          metadata: {
            creditAmount: pkg.creditAmount.toString(),
          },
        });
        console.log(`Created product ${pkg.name} in Stripe`);
      }

      // Check if price already exists
      let price;
      try {
        price = await stripe.prices.retrieve(pkg.stripePriceId);
        console.log(`Price for ${pkg.name} already exists in Stripe`);
      } catch (error) {
        // Create the price if it doesn't exist
        price = await stripe.prices.create({
          id: pkg.stripePriceId,
          product: pkg.stripeProductId,
          unit_amount: pkg.priceInCents,
          currency: 'usd',
          recurring: {
            interval: 'month',
          },
          metadata: {
            creditAmount: pkg.creditAmount.toString(),
          },
        });
        console.log(`Created price for ${pkg.name} in Stripe`);
      }
    }

    return { success: true, message: 'Stripe products and prices created successfully' };
  } catch (error) {
    console.error('Error creating Stripe products:', error);
    return { success: false, message: 'Failed to create Stripe products', error };
  }
}

// Function to create a checkout session for a credit package
export async function createCheckoutSession(priceId: string, customerId?: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer: customerId,
    });

    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, message: 'Failed to create checkout session', error };
  }
}

// Function to handle webhook events from Stripe
export async function handleStripeWebhook(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful checkout
        // This would update the user's credits in the database
        console.log('Checkout completed:', session);
        break;
      
      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        // Handle successful payment
        // This would update the user's subscription status and add credits
        console.log('Invoice paid:', invoice);
        break;
      
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        // Handle failed payment
        // This would notify the user and update subscription status
        console.log('Payment failed:', failedInvoice);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { success: true, message: 'Webhook handled successfully' };
  } catch (error) {
    console.error('Error handling webhook:', error);
    return { success: false, message: 'Failed to handle webhook', error };
  }
}
