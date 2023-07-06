import connect from "@/utils/db";
import Saved from "@/models/Saved";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connect();
    await Saved.findByIdAndDelete(id);
    return new NextResponse("Unsaved", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database error", { status: 500 });
  }
}
