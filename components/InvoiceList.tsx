import { InvoiceActions } from "@/components/InvoiceActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InvoiceList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Invoice ID</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Method</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV-0001</TableCell>
          <TableCell className="font-medium">Paid</TableCell>
          <TableCell className="font-medium">Cash</TableCell>
          <TableCell className="font-medium">Rs. 1000</TableCell>
          <TableCell className="font-medium">2023-01-01</TableCell>
          <TableCell className="text-right">
            <InvoiceActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
