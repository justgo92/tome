// This file sets up environment variables for the application
// All sensitive values should be moved to .env.local and not committed to version control

export const env = {
  // Supabase configuration
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  
  // Stripe configuration
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  
  // Application configuration
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  
  // API endpoints for Python microservice
  PYTHON_WORKER_ENDPOINT: process.env.PYTHON_WORKER_ENDPOINT,
  CHATBOT_API_ENDPOINT: process.env.CHATBOT_API_ENDPOINT
};

// Add this to your gitignore if not already present:
// .env.local
