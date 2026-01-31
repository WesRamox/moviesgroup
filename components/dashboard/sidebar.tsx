"use client";

import { Home, Users, User2Icon, Popcorn, X, CheckIcon } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "../nav-user/nav-user";
import { Prisma } from "@prisma/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PendingInvitesWithGroup = Prisma.InviteGetPayload<{
  include: { group: true };
}>;

interface DashboardSidebarProps {
  session: {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
  pendingInvites: PendingInvitesWithGroup[];
}

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: Users,
  },
  {
    title: "Movies",
    url: "/dashboard/movies",
    icon: Popcorn,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User2Icon,
  },
];

export function DashboardSidebar({ session, pendingInvites }: DashboardSidebarProps) {
  const router = useRouter();
  const handleInviteAction = async (inviteId: string, action: "ACCEPT" | "DECLINE") => {
    try {
      const res = await fetch(`/api/invites/${inviteId}`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        toast.success(action === "ACCEPT" ? "Joined group!" : "Invite declined");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Connection error: " + error);
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 h-16">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            M<span className="text-blue-500">G</span>
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Movies<span className="text-blue-500">Group</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="mr-2">
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Invites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="ml-2">
              {pendingInvites.length === 0 && (
                <SidebarMenuItem>
                  <span className="text-sm text-muted-foreground">No pending invites</span>
                </SidebarMenuItem>
              )}
              {pendingInvites.map((invite) => (
                <SidebarMenuItem key={invite.id} className="flex items-center justify-around gap-2">
                  <span className="text-sm">
                    Invite to <span className="font-medium">{invite.group.name}</span>
                  </span>
                  <div className="flex gap-2">
                    <Button onClick={() => handleInviteAction(invite.id, "ACCEPT")}>
                      <CheckIcon />
                    </Button>
                    <Button variant={"outline"} onClick={() => handleInviteAction(invite.id, "DECLINE")}>
                      <X />
                    </Button>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
