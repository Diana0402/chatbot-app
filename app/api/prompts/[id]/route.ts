import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
type Context={params:{id:string}};
export async function PUT(req:Request,{params}:Context){try{const b=await req.json();const p=await prisma.systemPrompt.update({where:{id:params.id},data:{name:b.name,content:b.content}});return NextResponse.json(p);}catch{return NextResponse.json({error:"Could not update prompt"},{status:400});}}
export async function DELETE(_req:Request,{params}:Context){try{await prisma.systemPrompt.delete({where:{id:params.id}});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Could not delete prompt"},{status:404});}}
