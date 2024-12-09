import { requireAuth } from "@/app/utils/hooks";
import { DashboardBlocks } from "@/components/DashboardBlocks";
import { signOut } from "next-auth/react";

export default async function DashboardRoute() {
  await requireAuth();

  return (
    <div>
      <DashboardBlocks />
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
