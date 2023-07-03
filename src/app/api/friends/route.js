import Friend from "@/models/Friend";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, addeduser, username, userimage, accepted } =
    await request.json();

  try {
    await connect();

    await Friend.findOneAndUpdate(
      { email, addeduser },
      { email, addeduser, username, userimage, accepted },
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

export async function GET(request) {

  try {
    await connect();
    const groups = await Friend.find();
    return new NextResponse(JSON.stringify(groups), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
}
