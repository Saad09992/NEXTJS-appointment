import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Define routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user is not authenticated and trying to access protected route
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    // Add the original URL as a redirect parameter
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access public route (like login)
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: [
    // Match all protected routes
    // "/dashboard/:path*",
    // "/profile/:path*",
    // "/settings/:path*",
    // Match all public routes
    "/",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
