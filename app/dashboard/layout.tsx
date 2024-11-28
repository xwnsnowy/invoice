import { requireAuth } from "@/app/utils/hooks";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, address: true },
  });

  if (!data?.firstName || !data.lastName || !data.address) {
    redirect("/onboarding");
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  await getUser(session.user?.id as string);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
