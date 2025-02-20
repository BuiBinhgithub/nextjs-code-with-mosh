import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/migrations/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; name: string } }
) {
  //fetch data from db
  const userDetail = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!userDetail)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(userDetail);
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
