import { NextRequest, NextResponse } from "next/server";
import productSchema from "../schema";

export async function GET(
  request: NextRequest,
  params: { id: number; name: string; price: number }
) {
  if (params?.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json([{ id: params.id, name: "Milk", price: 2.5 }]);
}

export async function PUT(
  request: NextRequest,
  params: { id: number; name: string; price: number }
) {
  const body = await request.json();
  const validate = productSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  if (params?.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ name: body.name, price: body.price });
}

export async function DELETE(
  request: NextRequest,
  params: { id: number; name: string; price: number }
) {
  if (params?.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({});
}
