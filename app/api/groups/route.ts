import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { createGroupSchema } from "@/dtos/create-group-dto";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groups = await prisma.group.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { members: { some: { userId: session.user.id } } },
      ]
    }
  })

  return NextResponse.json(groups)
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unathorized" }, { status: 401 })
    }

    const body = await req.json()
    const data = createGroupSchema.parse(body)

    const group = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        ownerId: session.user.id,

        members: {
          create: {
            userId: session.user.id,
            role: "owner",
          },
        },
      },
      include: {
        members: true,
      },
    })

    return NextResponse.json(group, { status: 201 })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Erro ao criar grupo" },
      { status: 500 }
    )
  }
}
