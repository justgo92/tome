// This file contains functions to set up and interact with Supabase database
// It will be used to create tables and manage data in Supabase

import supabaseClient from './supabaseClient';
import { createTableSQL } from './supabase';

// Function to create all necessary tables in Supabase
export async function createSupabaseTables() {
  try {
    // Create tables in the correct order to respect foreign key constraints
    // 1. First create organizations table (no foreign keys)
    const { error: orgError } = await supabaseClient.rpc('exec_sql', { 
      sql: createTableSQL.organizations 
    });
    
    if (orgError) throw orgError;
    console.log('Organizations table created successfully');
    
    // 2. Create users table (references organizations)
    const { error: usersError } = await supabaseClient.rpc('exec_sql', { 
      sql: createTableSQL.users 
    });
    
    if (usersError) throw usersError;
    console.log('Users table created successfully');
    
    // 3. Create assets table (references users and organizations)
    const { error: assetsError } = await supabaseClient.rpc('exec_sql', { 
      sql: createTableSQL.assets 
    });
    
    if (assetsError) throw assetsError;
    console.log('Assets table created successfully');
    
    // 4. Create credit_transactions table (references users, organizations, and assets)
    const { error: transactionsError } = await supabaseClient.rpc('exec_sql', { 
      sql: createTableSQL.credit_transactions 
    });
    
    if (transactionsError) throw transactionsError;
    console.log('Credit transactions table created successfully');
    
    // 5. Create credit_packages table (no foreign keys)
    const { error: packagesError } = await supabaseClient.rpc('exec_sql', { 
      sql: createTableSQL.credit_packages 
    });
    
    if (packagesError) throw packagesError;
    console.log('Credit packages table created successfully');
    
    return { success: true, message: 'All tables created successfully' };
  } catch (error) {
    console.error('Error creating Supabase tables:', error);
    return { success: false, message: 'Failed to create tables', error };
  }
}

// Function to initialize credit packages in Supabase
export async function initializeCreditPackages() {
  try {
    const { data: existingPackages, error: fetchError } = await supabaseClient
      .from('credit_packages')
      .select('*');
    
    if (fetchError) throw fetchError;
    
    // If packages already exist, don't recreate them
    if (existingPackages && existingPackages.length > 0) {
      console.log('Credit packages already exist in Supabase');
      return { success: true, message: 'Credit packages already exist' };
    }
    
    // Import credit packages from Stripe configuration
    const { CREDIT_PACKAGES } = await import('./stripe');
    
    // Insert credit packages into Supabase
    const { error: insertError } = await supabaseClient
      .from('credit_packages')
      .insert(
        CREDIT_PACKAGES.map(pkg => ({
          name: pkg.name,
          description: pkg.description,
          credit_amount: pkg.creditAmount,
          price_in_cents: pkg.priceInCents,
          stripe_product_id: pkg.stripeProductId,
          stripe_price_id: pkg.stripePriceId
        }))
      );
    
    if (insertError) throw insertError;
    console.log('Credit packages initialized in Supabase');
    
    return { success: true, message: 'Credit packages initialized successfully' };
  } catch (error) {
    console.error('Error initializing credit packages:', error);
    return { success: false, message: 'Failed to initialize credit packages', error };
  }
}

// Function to set up storage buckets for document uploads
export async function setupStorageBuckets() {
  try {
    // Create bucket for original documents
    const { error: originalError } = await supabaseClient
      .storage
      .createBucket('original-documents', {
        public: false,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
          'text/plain'
        ]
      });
    
    if (originalError && originalError.message !== 'Bucket already exists') {
      throw originalError;
    }
    console.log('Original documents bucket created or already exists');
    
    // Create bucket for processed assets
    const { error: processedError } = await supabaseClient
      .storage
      .createBucket('processed-assets', {
        public: false,
        fileSizeLimit: 52428800 // 50MB
      });
    
    if (processedError && processedError.message !== 'Bucket already exists') {
      throw processedError;
    }
    console.log('Processed assets bucket created or already exists');
    
    return { success: true, message: 'Storage buckets set up successfully' };
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
    return { success: false, message: 'Failed to set up storage buckets', error };
  }
}
