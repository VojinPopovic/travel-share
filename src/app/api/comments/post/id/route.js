import connect from "@/utils/db";
import Post_comments from "@/models/PostComment";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  try {
    await connect();
    const Post_commentss = await Post_comments.find(id && { id });
    return new NextResponse(JSON.stringify(Post_commentss), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
