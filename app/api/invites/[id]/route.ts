import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const { id: inviteId } = await params;
  const { action } = await req.json();

  if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const invite = await prisma.invite.findUnique({
    where: { id: inviteId },
    include: { group: true }
  })

  if (!invite || invite.email !== session.user.email) {
    return NextResponse.json({ message: "Invite not found" }, { status: 404 })
  }

  if (action === "ACCEPT") {
    await prisma.$transaction([
      prisma.groupMember.create({
        data: {
          groupId: invite.groupId,
          userId: session.user.id,
        }
      }),

      prisma.invite.delete({
        where: { id: inviteId }
      })
    ]);

    return NextResponse.json({ message: "Joined group!" });
  }

  await prisma.invite.delete({ where: { id: inviteId } })
  return NextResponse.json({ message: "Invite declined" })
}