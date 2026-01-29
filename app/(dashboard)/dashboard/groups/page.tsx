"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";

type Group = {
  id: string;
  name: string;
  description?: string;
};

export default function GroupsDashboard() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchGroups() {
      const response = await fetch("/api/groups");
      if (!response.ok) {
        console.error("Failed to fetch groups");
        return;
      }

      const data = await response.json();
      setGroups(data);
      setLoading(false);
    }

    fetchGroups();
  }, []);

  if (loading) {
    return <p>Loading groups...</p>;
  }

  return (
    <section className="space-y-6 w-full flex flex-col">
      <header>
        <h1 className="text-2xl font-bold">Your Groups</h1>
        <p className="text-muted-foreground">See your groups and the movies you&apos;ve watched.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {groups.map((group) => (
          <Card key={group.id} className="border flex py-0 flex-col w-full">
            <div className="relative h-40 w-full">
              <Image width={500} height={500} src="/group.png" alt={group.name} className="h-full w-full object-cover" />
            </div>

            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {group.name}
                <Badge variant="secondary">2 Members</Badge>
              </CardTitle>

              <CardDescription>⭐ Average: 11</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Separator />

              <h3 className="text-sm font-semibold">Movies</h3>

              <ScrollArea className="h-48 pr-2">
                <div className="space-y-3">
                  <div className="rounded-md border p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Teste</p>
                      <Badge variant="outline">Teste</Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">Teste</p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
