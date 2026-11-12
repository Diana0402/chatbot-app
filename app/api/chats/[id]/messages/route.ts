import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAssistantReply } from "@/lib/assistant";
export const dynamic = "force-dynamic";
type Context = { params: { id: string } };
export async function POST(req: Request, { params }: Context) {
  try {
    const body = await req.json();
    const content = typeof body.content === "string" ? body.content.trim() : "";
    if (!content) return NextResponse.json({error:"Please enter a message."},{status:400});
    if (content.length > 3000) return NextResponse.json({error:"Please keep messages under 3,000 characters."},{status:400});
    const chat = await prisma.chatSession.findUnique({where:{id:params.id}});
    if (!chat) return NextResponse.json({error:"Conversation not found."},{status:404});
    const userMessage = await prisma.message.create({data:{sessionId:params.id,role:"user",content}});
    const answer = await createAssistantReply(content);
    const assistantMessage = await prisma.message.create({data:{sessionId:params.id,role:"assistant",content:answer}});
    const title = chat.title === "New conversation" ? content.slice(0,48) : chat.title;
    await prisma.chatSession.update({where:{id:params.id},data:{title}});
    return NextResponse.json({userMessage,assistantMessage});
  } catch { return NextResponse.json({error:"The assistant is temporarily unavailable. Please try again."},{status:503}); }
}
