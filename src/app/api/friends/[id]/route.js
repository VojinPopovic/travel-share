import Friend from "@/models/Friend";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { accepted } = await request.json();

  try {
    await connect();
    await Friend.findByIdAndUpdate(id, { accepted }, { new: true });
    return new NextResponse("Group has been deleted", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database error", { status: 500 });
  }
}
