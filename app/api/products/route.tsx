import { NextRequest, NextResponse } from "next/server";
import productSchema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const lastProduct = await prisma.product.findFirst({
    orderBy: { id: "desc" },
  });
  const newId = lastProduct ? lastProduct.id + 1 : 1;
  const duplicateProduct = await prisma.product.findFirst({
    where: { name: body.name },
  });
  const product = await prisma.product.create({
    data: {
      id: newId,
      name: body.name,
      price: body.price,
    },
  });
  if (duplicateProduct)
    return NextResponse.json(
      { message: "Product already exists" },
      { status: 401 }
    );
  const validate = productSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 401 });
  return NextResponse.json(product);
}
