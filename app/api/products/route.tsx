import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import productSchema from "./schema";

export async function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Milk", price: 2.5 },
    { id: 2, name: "Bread", price: 3.5 },
  ]);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = productSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 201 });
  return NextResponse.json({ id: 1, name: body.name, price: body.price });
}
