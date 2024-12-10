import { getRecentUserInvoices } from "@/app/services/invoiceService";
import { formatCurrency } from "@/app/utils/formatCurrenct";
import { requireAuth } from "@/app/utils/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function RecentInvoices() {
  const session = await requireAuth();
  const data = await getRecentUserInvoices(session.user?.id as string);
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((invoice) => (
          <div className="flex items-center gap-4" key={invoice.id}>
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>
                {invoice.clientName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-mediuml leading-none">
                {invoice.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {invoice.clientEmail}
              </p>
            </div>
            <div className="ml-auto font-medium">
              +
              {formatCurrency({
                amount: invoice.total,
                currency: invoice.currency as any,
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
