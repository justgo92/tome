// This file creates API routes for initializing Supabase and Stripe
// It will be used to set up the database and payment infrastructure

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseTables, initializeCreditPackages, setupStorageBuckets } from '@/lib/supabase-api';
import { createStripeProducts } from '@/lib/stripe-api';

// API route to initialize the entire infrastructure
export async function POST(req: NextRequest) {
  try {
    // Step 1: Create Supabase tables
    const tablesResult = await createSupabaseTables();
    if (!tablesResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to create Supabase tables',
        error: tablesResult.error 
      }, { status: 500 });
    }
    
    // Step 2: Set up storage buckets
    const bucketsResult = await setupStorageBuckets();
    if (!bucketsResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to set up storage buckets',
        error: bucketsResult.error 
      }, { status: 500 });
    }
    
    // Step 3: Create Stripe products
    const stripeResult = await createStripeProducts();
    if (!stripeResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to create Stripe products',
        error: stripeResult.error 
      }, { status: 500 });
    }
    
    // Step 4: Initialize credit packages in Supabase
    const packagesResult = await initializeCreditPackages();
    if (!packagesResult.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to initialize credit packages',
        error: packagesResult.error 
      }, { status: 500 });
    }
    
    // All steps completed successfully
    return NextResponse.json({ 
      success: true, 
      message: 'Infrastructure initialized successfully',
      results: {
        tables: tablesResult,
        buckets: bucketsResult,
        stripe: stripeResult,
        packages: packagesResult
      }
    });
  } catch (error) {
    console.error('Error initializing infrastructure:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to initialize infrastructure',
      error 
    }, { status: 500 });
  }
}
