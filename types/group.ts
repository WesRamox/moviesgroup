export interface Group {
  id: string;
  name: string;
  description?: string;
  type: "COUPLE" | "FRIENDS" | "FAMILY"
  ownerId: string;
  createdAt: string;
}