import { createClient } from '@supabase/supabase-js';
import { isDevelopmentEnvironment } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get('redirectUrl') || '/';
  
  // Create a temporary guest user with Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  // In development mode, we'll bypass authentication
  if (isDevelopmentEnvironment) {
    // Redirect to the requested URL
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  
  // Create anonymous session
  const { data, error } = await supabase.auth.signInAnonymously();
  
  if (error) {
    console.error('Error creating guest account:', error);
    return NextResponse.json({ error: 'Failed to create guest account' }, { status: 500 });
  }
  
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
