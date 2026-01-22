import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from API" });
}
// This is a simple Next.js API route that responds with a JSON message when accessed via a GET request.