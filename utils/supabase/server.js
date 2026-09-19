// Server-side Supabase client for the App Router.
// Uses the async `cookies()` API from next/headers (Next 15) so the session
// cookie set by login/signup is readable on the server. Values are read from
// environment variables, never hard-coded.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` call can throw if it is called from a Server
            // Component. In that case the auth tokens can only be written by
            // a Server Action or a Route Handler, so we ignore the error.
          }
        },
      },
    }
  );
}