import connect from "@/utils/db";
import Saved from "@/models/Saved";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, postid } = await request.json();

  try {
    await connect();

    await Saved.findOneAndUpdate(
      { email, postid },
      { email, postid },
      { upsert: true }
    );
    return new NextResponse("Success", {
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
    const saveds = await Saved.find();
    return new NextResponse(JSON.stringify(saveds), { status: 200 });
  } catch (error) {
    return new NextResponse("error", { status: 500 });
  }
}
