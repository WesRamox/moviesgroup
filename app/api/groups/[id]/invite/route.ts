import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id: groupId } = await params;

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const group = await prisma.group.findFirst({
      where: {
        id: groupId,
        OR: [
          { ownerId: session.user.id },
          { members: { some: { id: session.user.id } } }
        ]
      }
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found or access denied" }, { status: 404 });
    }

    const alreadyMember = await prisma.user.findFirst({
      where: {
        email,
        groups: { some: { id: groupId } }
      }
    });

    if (alreadyMember) {
      return NextResponse.json({ message: "User is already a member" }, { status: 400 });
    }

    const invite = await prisma.invite.upsert({
      where: {
        groupId_email: {
          groupId,
          email,
        }
      },
      update: {
        status: "PENDING",
        senderId: session.user.id
      },
      create: {
        groupId,
        email,
        senderId: session.user.id,
        status: "PENDING"
      }
    });

    return NextResponse.json(invite, { status: 201 });

  } catch (error) {
    console.error("INVITE_ERROR", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}