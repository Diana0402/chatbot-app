import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  try { const prompts = await prisma.systemPrompt.findMany({orderBy:{createdAt:"asc"}}); return NextResponse.json(prompts); }
  catch { return NextResponse.json({error:"Database unavailable"},{status:503}); }
}
export async function POST(req: Request) {
  try { const body=await req.json(); if(!body.name?.trim()||!body.content?.trim()) return NextResponse.json({error:"Name and content are required"},{status:400}); const prompt=await prisma.systemPrompt.create({data:{name:body.name.trim(),content:body.content.trim()}}); return NextResponse.json(prompt,{status:201}); }
  catch { return NextResponse.json({error:"Could not create prompt"},{status:400}); }
}
