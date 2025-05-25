import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
// In a real environment, these would be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a single supabase client for the entire app
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseClient;
