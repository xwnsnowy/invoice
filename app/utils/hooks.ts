import { auth } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}