import Post_comment from "@/models/PostComment";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const newPost_comment = new Post_comment(body);
  try {
    await connect();
    await newPost_comment.save();
    return new NextResponse("post has been created", body, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
