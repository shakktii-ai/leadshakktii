import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (username === "admin" && password === "admin123") {
      // Return success with token
      const token = Buffer.from(`admin:${Date.now()}:authenticated`).toString("base64");
      
      const response = NextResponse.json(
        {
          success: true,
          message: "Authentication successful",
          token,
        },
        { status: 200 }
      );

      // Set cookie for session
      response.cookies.set("admin_session", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
