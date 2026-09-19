// Browser-side Supabase client.
// Imported by client components ("use client"). createBrowserClient is safe
// to run in the browser; it uses the publishable key, which is meant to be
// public. Values come from environment variables, never hard-coded.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}