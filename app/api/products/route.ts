import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() { try { return NextResponse.json(await prisma.product.findMany({orderBy:{category:"asc"}})); } catch { return NextResponse.json({error:"Product catalogue unavailable"},{status:503}); } }
