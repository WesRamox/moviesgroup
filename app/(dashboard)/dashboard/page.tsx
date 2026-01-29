import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateGroupDialog from "@/components/groups/create/create-group-dialog";
import InviteGroupDialog from "@/components/groups/invite/invite-group-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if(!session?.user?.id) {  
    return null;
  }

  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  return (
    <section className="w-full flex-col gap-6 flex bg-linear-to-br from-background to-muted">
      <header>
        <h1 className="text-2xl font-bold">Welcome back, {session.user.name}!</h1>
        <p className="text-muted-foreground">Are you ready to explore your groups and the movies you&apos;ve watched?</p>
      </header>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>My Groups</CardTitle>
          <CardDescription>Manage the groups you&apos;ve created or are part of to watch movies together.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {groups.map((group) => (
            <Card key={group.id} className="border flex flex-row py-0">
              <div className="h-55 w-1/2 rounded-l-md overflow-hidden">
                <Image width={500} height={500} src="/group.png" alt={group.name} className="w-full h-full object-cover" />
              </div>
              <div className="py-5 flex flex-col gap-5">
                <CardHeader>
                  <CardTitle className="text-md font-semibold">{group.name}</CardTitle>
                  <CardDescription>{group.members.length} members</CardDescription>
                  <CardContent className="mt-2 px-0">
                    <h2>Movies watched: 0</h2>
                    <p className="flex gap-1 items-center">⭐ 5 Average</p>
                  </CardContent>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  <Button>View Group</Button>
                  <InviteGroupDialog groupId={group.id} />
                </CardFooter>
              </div>
            </Card>
          ))}
          <CreateGroupDialog />
        </CardContent>
      </Card>
    </section>
  );
}
