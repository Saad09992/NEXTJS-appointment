export async function POST(request) {
  try {
    // Create response
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });

    // Clear the token cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
