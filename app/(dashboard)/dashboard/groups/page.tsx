import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GroupList from "@/components/groups/list/group-list";
import { Suspense } from "react";
import { GroupListSkeleton } from "@/components/groups/list/group-list-skeleton";
import { Button } from "@/components/ui/button";
import CreateGroupDialog from "@/components/groups/create/create-group-dialog";

export default async function GroupsDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  return (
    <section className="mx-auto container py-6 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Your Groups</h1>
          <p className="text-muted-foreground text-sm">Manage your movie circles and collective ratings.</p>
        </div>

        <Button asChild className="font-bold shadow-sm">
            <CreateGroupDialog className="cursor-pointer font-medium" />
        </Button>
      </header>

      <Suspense fallback={<GroupListSkeleton />}>
        <GroupList userId={session.user.id} />
      </Suspense>
    </section>
  );
}
