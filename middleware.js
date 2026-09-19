// Root Next.js middleware: runs the Supabase session refresh on matching
// requests. The matcher skips static assets (next images, favicon, and the
// archive's image files) so they do not need session handling.
import { updateSession } from "./utils/supabase/middleware.js";

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};