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

    const userToInvite = await prisma.user.findUnique({
      where: { email }
    });

    if (!userToInvite) {
      return NextResponse.json(
        { message: "This user is not registered in the app yet." },
        { status: 404 }
      );
    }

    const group = await prisma.group.findFirst({
      where: {
        id: groupId,
        ownerId: session.user.id
      }
    });

    if (!group) {
      return NextResponse.json(
        { message: "Only the group owner can send invites" },
        { status: 403 }
      );
    }

    const alreadyMember = await prisma.groupMember.findFirst({
      where: {
        groupId,
        user: { email }
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