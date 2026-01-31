"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface InviteGroupFormProps {
  groupId: string;
}

export default function InviteGroupForm({ groupId }: InviteGroupFormProps) {
  const [email, setEmail] = useState<string>("");

  const onSubmit = async () => {
    try {
      const res = await fetch(`/api/groups/${groupId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Invite sent successfully!");
        document.getElementById("close-dialog")?.click();
      } else {
        toast.error("Failed to send invite");
      }
    } catch (err) {
      toast.error("Connection error: " + err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email-1">Email Address</Label>
          <Input id="email-1" name="email" type="email" placeholder="Enter email to invite" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" id="close-dialog">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Send Invite</Button>
      </DialogFooter>
    </form>
  );
}
