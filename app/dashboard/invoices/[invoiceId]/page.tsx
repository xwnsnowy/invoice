import { getInvoiceByUser } from "@/app/services/invoiceService";
import { requireAuth } from "@/app/utils/hooks";
import { EditInvoice } from "@/components/EditInvoice";

export default async function EditInvoiceRoute({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;
  const session = await requireAuth();
  const data = await getInvoiceByUser(invoiceId, session.user?.id as string);
  return <EditInvoice data={data} />;
}
