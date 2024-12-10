import { getUserInvoicesByDate } from "@/app/services/invoiceService";
import { requireAuth } from "@/app/utils/hooks";
import { Graph } from "@/components/Graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function InvoiceGraph() {
  const session = await requireAuth();
  const data = await getUserInvoicesByDate(session.user?.id as string);

  // console.log(data);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
}
