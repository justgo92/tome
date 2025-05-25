// This file sets up environment variables for the application
// In a real environment, these would be in .env.local and not committed to version control

export const env = {
  // Supabase configuration
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key',
  
  // Stripe configuration
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_your_key',
  
  // Application configuration
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // API endpoints for Python microservice
  PYTHON_WORKER_ENDPOINT: process.env.PYTHON_WORKER_ENDPOINT || 'http://localhost:8000',
  CHATBOT_API_ENDPOINT: process.env.CHATBOT_API_ENDPOINT || 'http://localhost:8001'
};
