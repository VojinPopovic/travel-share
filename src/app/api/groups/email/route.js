import Group from "@/models/Group";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request){
  const url = new URL(request.url);

  const email = url.searchParams.get("email");
  try {
    await connect();
    const posts = await Group.find(email && { email });
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
