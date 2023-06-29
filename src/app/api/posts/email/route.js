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
export async function POST(request) {
  const { email, groupname } = await request.json();

  try {
    await connect();

    await Group.findOneAndUpdate(
      { email, groupname },
      { email, groupname },
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
