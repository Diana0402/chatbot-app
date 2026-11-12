import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
type Context = { params: { id: string } };
export async function GET(_req: Request, { params }: Context) {
  try { const chat = await prisma.chatSession.findUnique({ where:{id:params.id}, include:{messages:{orderBy:{createdAt:"asc"}}} }); if (!chat) return NextResponse.json({error:"Chat not found"},{status:404}); return NextResponse.json(chat); }
  catch { return NextResponse.json({error:"Could not load chat"},{status:503}); }
}
export async function PUT(req: Request, { params }: Context) {
  try {
    const body = await req.json();
    const chat = await prisma.chatSession.update({ where:{id:params.id}, data:{
      ...(typeof body.temperature === "number" ? {temperature: Math.min(1, Math.max(0, body.temperature))} : {}),
      ...(typeof body.topP === "number" ? {topP: Math.min(1, Math.max(0, body.topP))} : {}),
      ...(typeof body.model === "string" ? {model: body.model} : {})
    }});
    return NextResponse.json(chat);
  } catch { return NextResponse.json({error:"Could not save settings"},{status:400}); }
}
export async function DELETE(_req: Request, { params }: Context) {
  try { await prisma.chatSession.delete({ where:{id:params.id} }); return NextResponse.json({ok:true}); }
  catch { return NextResponse.json({error:"Could not delete chat"},{status:404}); }
}
