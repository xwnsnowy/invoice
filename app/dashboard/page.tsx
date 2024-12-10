import { requireAuth } from "@/app/utils/hooks";
import { DashboardBlocks } from "@/components/DashboardBlocks";
import { InvoiceGraph } from "@/components/InvoiceGraph";
import { signOut } from "next-auth/react";

export default async function DashboardRoute() {
  await requireAuth();

  return (
    <div>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <InvoiceGraph />
        <h1 className="col-span-1">Recent Invoice</h1>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
