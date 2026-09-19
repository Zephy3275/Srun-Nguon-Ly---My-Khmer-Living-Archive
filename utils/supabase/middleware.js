// Supabase session middleware used by the root middleware.js file.
// On matching requests it refreshes the session token (if it is near expiry)
// and writes the updated auth cookies back, so a logged-in user stays logged
// in and server-side reads of the session stay fresh.
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between creating the Supabase client and calling
  // getUser(), as getUser() may write the session/refresh cookies.
  await supabase.auth.getUser();

  return supabaseResponse;
}