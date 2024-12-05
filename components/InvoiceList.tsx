import { getUserInvoices } from "@/app/services/invoiceService";
import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrenct";
import { requireAuth } from "@/app/utils/hooks";
import { InvoiceActions } from "@/components/InvoiceActions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function InvoiceList() {
  const session = await requireAuth();
  const data = await getUserInvoices(session.user?.id as string);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Invoice ID</TableHead>
          <TableHead className="">Customer</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">
              {invoice.invoiceNumber}
            </TableCell>
            <TableCell className="font-medium">{invoice.clientName}</TableCell>
            <TableCell className="font-medium">
              {formatCurrency({
                amount: invoice.total,
                currency: invoice.currency as any,
              })}
            </TableCell>
            <TableCell className="font-medium">
              <Badge>{invoice.status}</Badge>
            </TableCell>
            <TableCell className="font-medium">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(invoice.createdAt)}
            </TableCell>
            <TableCell className="text-right">
              <InvoiceActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
