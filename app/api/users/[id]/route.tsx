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
  { params }: { params: { id: string; name: string; email: string } }
) {
  const body = await request.json();
  const validate = schema.safeParse(body);

  const user = await prisma.user.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: body.name });
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
