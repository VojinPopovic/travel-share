import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();
  const newPost = new Post(body);
  console.log(body)
  try {
    await connect();
    await newPost.save();
    return new NextResponse("post has been created", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};