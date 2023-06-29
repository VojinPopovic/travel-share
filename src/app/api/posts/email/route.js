import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connect from "@/utils/db";

export async function GET(request){
  const url = new URL(request.url);

  const email = url.searchParams.get("email");
  try {
    await connect();
    const posts = await Post.find(email && { email });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
export async function POST(request){
  const body = await request.json();
  const newPost = new Post(body);
  try {
    await connect();
    await newPost.save();
    return new NextResponse("post has been created", body, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
