// This file should be empty or minimal since we're using Supabase auth
// We're removing the NextAuth implementation to avoid conflicts

// Provide dummy exports to satisfy any imports in the codebase
export const handlers = { GET: null, POST: null };
export const auth = async () => null;
export const signIn = async () => null;
export const signOut = async () => null;

export type UserType = 'guest' | 'regular';

