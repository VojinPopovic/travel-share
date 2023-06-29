import Comment from "@/models/Comments";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");
  try {
    await connect();
    const comments = await Comment.find(email && { email });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function POST(request){
  const body = await request.json();
  const newComment = new Comment(body);
  try {
    await connect();
    await newComment.save();
    return new NextResponse("post has been created", body, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};


