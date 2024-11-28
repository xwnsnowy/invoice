"use server";

import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import { onboardingSchema } from "@/app/utils/zodSchema";
import { parseWithZod } from '@conform-to/zod';
import { redirect } from "next/navigation";

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireAuth();

  const submission = parseWithZod(formData, { schema: onboardingSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
} 
