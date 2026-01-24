"use client";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession();
  
  if(status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your profile information.</p>
      </header>
      <div className="p-4 flex gap-4 items-center space-y-2">
        <Image className="rounded-3xl" src={session?.user?.image || ""} alt="Profile Picture" width={100} height={100} />
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
          <p className="text-muted-foreground text-md">{session?.user?.email}</p>
          <Badge className="text-xs text-blue-300">Premium</Badge>
        </div>
      </div>
    </section>
  );
}
