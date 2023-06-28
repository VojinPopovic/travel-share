import Group from "@/models/Group";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connect();
    await Group.findByIdAndDelete(id);
    return new NextResponse("Group has been deleted", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database error", { status: 500 });
  }
}
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connect();
    const post = await Group.findById(id);
    return new NextResponse(post, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database error", { status: 500 });
  }
}