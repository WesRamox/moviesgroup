import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function GroupListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="border-2 shadow-none flex flex-col w-full overflow-hidden">
          <Skeleton className="h-32 w-full rounded-none" />

          <CardHeader className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-5 w-5 rounded-md" />
            </div>

            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-8 rounded-full border-2 border-background" />
                ))}
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
