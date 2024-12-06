import prisma from "@/app/utils/db";
import { CreateInvoice } from "@/components/CreateInvoice";

export default function InvoiceCreateRoute() {
  return <CreateInvoice />;
}
