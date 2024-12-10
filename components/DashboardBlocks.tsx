import { getInvoicesData } from "@/app/services/invoiceService";
import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrenct";
import { requireAuth } from "@/app/utils/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export async function DashboardBlocks() {
  const session = await requireAuth();
  const { data, pendingInvoices, paidInvoices } = await getInvoicesData(
    session.user?.id as string
  );
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Total Revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {/* array.reduce(callback(accumulator, currentValue), initialValue) */}
            {formatCurrency({
              amount: data.reduce((a, b) => a + b.total, 0),
              currency: "USD",
            })}
          </h2>
          <p className="text-xs text-muted-foreground">
            Based on the last 30 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground">Total Invoices Issued</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Total Invoices which have been paid
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{pendingInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">
            Invoices which are currently pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
