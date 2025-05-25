import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In production, these would be environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  organization_id: string;
};

export type Organization = {
  id: string;
  name: string;
  created_at: string;
  subscription_status: 'active' | 'inactive' | 'trial';
};

export type CreditPackage = {
  id: string;
  name: string;
  description: string;
  credit_amount: number;
  price_in_cents: number;
  stripe_product_id: string;
  stripe_price_id: string;
};

export type CreditTransaction = {
  id: string;
  user_id: string;
  organization_id: string;
  amount: number;
  transaction_type: 'purchase' | 'usage' | 'refund' | 'expiry';
  created_at: string;
  asset_id?: string;
  stripe_payment_intent_id?: string;
};

export type Asset = {
  id: string;
  user_id: string;
  organization_id: string;
  original_document_url: string;
  original_document_name: string;
  asset_type: 'e-learning' | 'video' | 'process-map' | 'job-aid';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  output_url?: string;
  credits_used: number;
  audience?: string;
  tone?: string;
  compliance_text?: string;
};

// SQL for creating tables in Supabase
export const createTableSQL = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email TEXT UNIQUE NOT NULL,
      full_name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      organization_id UUID REFERENCES organizations(id)
    );
  `,
  
  organizations: `
    CREATE TABLE IF NOT EXISTS organizations (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      subscription_status TEXT DEFAULT 'trial'
    );
  `,
  
  credit_packages: `
    CREATE TABLE IF NOT EXISTS credit_packages (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      description TEXT,
      credit_amount INTEGER NOT NULL,
      price_in_cents INTEGER NOT NULL,
      stripe_product_id TEXT NOT NULL,
      stripe_price_id TEXT NOT NULL
    );
  `,
  
  credit_transactions: `
    CREATE TABLE IF NOT EXISTS credit_transactions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id),
      organization_id UUID REFERENCES organizations(id),
      amount INTEGER NOT NULL,
      transaction_type TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      asset_id UUID REFERENCES assets(id),
      stripe_payment_intent_id TEXT
    );
  `,
  
  assets: `
    CREATE TABLE IF NOT EXISTS assets (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id),
      organization_id UUID REFERENCES organizations(id),
      original_document_url TEXT NOT NULL,
      original_document_name TEXT NOT NULL,
      asset_type TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      completed_at TIMESTAMP WITH TIME ZONE,
      output_url TEXT,
      credits_used INTEGER DEFAULT 0,
      audience TEXT,
      tone TEXT,
      compliance_text TEXT
    );
  `
};
