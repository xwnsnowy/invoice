import { getUserInvoices } from "@/app/services/invoiceService";
import { requireAuth } from "@/app/utils/hooks";
import { DashboardBlocks } from "@/components/DashboardBlocks";
import { EmptyState } from "@/components/EmptyState";
import { InvoiceGraph } from "@/components/InvoiceGraph";
import { RecentInvoices } from "@/components/RecentInvoices";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function DashboardRoute() {
  const session = await requireAuth();
  const data = await getUserInvoices(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="You haven't created any invoice. Please create one!"
          buttonText="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <>
          <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
            <DashboardBlocks />
            <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
              <InvoiceGraph />
              <RecentInvoices />
            </div>
          </Suspense>
        </>
      )}
    </>
  );
}
