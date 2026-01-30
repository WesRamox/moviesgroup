import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function GroupListSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="border flex py-0 flex-col w-full">
          {/* Simulação da Imagem */}
          <Skeleton className="h-40 w-full rounded-t-xl rounded-b-none" />

          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              {/* Nome do Grupo */}
              <Skeleton className="h-6 w-1/2" />
              {/* Badge de Membros */}
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            {/* Média */}
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>

          <CardContent className="space-y-4">
            <Separator />

            {/* Título "Movies" */}
            <Skeleton className="h-4 w-16" />

            {/* Simulação da ScrollArea */}
            <div className="space-y-3 h-48 pr-2">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="rounded-md border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    {/* Título do Filme */}
                    <Skeleton className="h-4 w-24" />
                    {/* Badge do Filme */}
                    <Skeleton className="h-4 w-12" />
                  </div>
                  {/* Descrição do Filme */}
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
