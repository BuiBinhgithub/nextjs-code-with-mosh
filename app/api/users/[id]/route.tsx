import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number; name: string } }
) {
  //fetch data from db
  if (params?.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: params.id, name: " Binh" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number; name: string } }
) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: body.name });
}
export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number; name: string } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({});
}
