import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (!body.status) {
    return NextResponse.json(
      { error: "Status is required" },
      { status: 400 }
    );
  }

  const updatedTicket = await prisma.ticket.update({
    where: {
      id: Number(id),
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(updatedTicket);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.ticket.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Ticket deleted successfully",
  });
}