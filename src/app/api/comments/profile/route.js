import Comment from "@/models/Comments";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request){
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
};

export async function POST(request) {
  const { email, comment } = await request.json();

  try {
    await connect();

    await Comment.findOneAndUpdate(
      { email, comment },
      { email, comment },
      { upsert: true }
    );
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}

