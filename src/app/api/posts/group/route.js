import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/utils/db";

export async function GET(request){
  const url = new URL(request.url);

  const group = url.searchParams.get("group");
  try {
    await connect();
    const posts = await Post.find(group && { group });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
