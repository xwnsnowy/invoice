import { getUserData } from "@/app/services/userService";
import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import { CreateInvoice } from "@/components/CreateInvoice";

export default async function InvoiceCreateRoute() {
  const session = await requireAuth();
  const data = await getUserData(session.user?.id as string);
  return (
    <CreateInvoice
      lastName={data?.lastName as string}
      firstName={data?.firstName as string}
      email={data?.email as string}
      address={data?.address as string}
    />
  );
}
