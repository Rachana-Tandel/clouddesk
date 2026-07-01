import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || !body.title.trim()) {
    return NextResponse.json(
      { error: "Ticket title is required" },
      { status: 400 }
    );
  }

  const ticket = await prisma.ticket.create({
    data: {
      title: body.title.trim(),
      category: body.category || "Other",
      priority: body.priority || "Medium",
      status: "Open",
      notes: body.notes || "",
    },
  });

  return NextResponse.json(ticket);
}