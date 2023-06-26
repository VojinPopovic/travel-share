import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";

export async function GET(request){
  const url = new URL(request.url);

  const email = url.searchParams.get("email");
  try {
    await connect();
    const posts = await User.find(email && { email });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};