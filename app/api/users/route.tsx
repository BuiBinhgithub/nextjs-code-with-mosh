import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
export async function GET(request: NextRequest) {
  //fetch users from db
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  const lastUser = await prisma.user.findFirst({
    orderBy: { id: "desc" },
  });

  const newId = lastUser ? lastUser.id + 1 : 1;
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });

  const duplicateUser = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (duplicateUser)
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 401 }
    );
  const user = await prisma.user.create({
    data: {
      id: newId,
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user);
}
