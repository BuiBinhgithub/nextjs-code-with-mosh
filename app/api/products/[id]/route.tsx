import { NextRequest, NextResponse } from "next/server";
import productSchema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; name: string; price: number } }
) {
  console.log(typeof params.id);
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!product)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; name: string; price: number } }
) {
  const body = await request.json();
  const updateProduct = await prisma.product.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      name: body.name,
      price: body.price,
    },
  });
  const validate = productSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  if (!updateProduct)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ name: body.name, price: body.price });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; name: string; price: number } }
) {
  const deleteProduct = await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });
  if (!deleteProduct)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ message: "User deleted successfully" });
}
