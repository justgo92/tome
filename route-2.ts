// This file contains Stripe webhook handler for processing Stripe events
// It will be used to handle subscription events and credit purchases

import { NextRequest, NextResponse } from 'next/server';
import { handleStripeWebhook } from '@/lib/stripe-api';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_your_key';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

// Webhook endpoint for Stripe events
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';
    
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_webhook_secret';
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ success: false, message: 'Webhook signature verification failed' }, { status: 400 });
    }
    
    // Handle the webhook event
    const result = await handleStripeWebhook(event);
    
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ success: false, message: 'Error processing webhook' }, { status: 500 });
  }
}
