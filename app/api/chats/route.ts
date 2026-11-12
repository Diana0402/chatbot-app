import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  try { const chats = await prisma.chatSession.findMany({ orderBy: { updatedAt: "desc" }, select: { id:true, title:true, updatedAt:true, createdAt:true } }); return NextResponse.json(chats); }
  catch { return NextResponse.json({ error:"Database unavailable" }, { status:503 }); }
}
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const chat = await prisma.chatSession.create({ data: { temperature: Number.isFinite(body.temperature) ? body.temperature : 0.7, topP: Number.isFinite(body.topP) ? body.topP : 0.9 } });
    return NextResponse.json(chat, { status:201 });
  } catch { return NextResponse.json({ error:"Could not create chat" }, { status:503 }); }
}
