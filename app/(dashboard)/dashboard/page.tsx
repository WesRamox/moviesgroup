"use client";

import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    // <Card className="w-full flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
    // </Card>
    <></>
  );
}
