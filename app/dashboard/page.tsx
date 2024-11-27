import { requireAuth } from "@/app/utils/hooks";
import { signOut } from "next-auth/react";

export default async function DashboardRoute() {
  await requireAuth();

  return (
    <div>
      <h1>Dashboard</h1>
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
