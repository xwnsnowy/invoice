"use server";

import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import { invoiceSchema, onboardingSchema } from "@/app/utils/zodSchema";
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

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireAuth();

  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      invoiceItemDescrption: submission.value.invoiceItemDescrption,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      note: submission.value.note,
      status: submission.value.status,
      total: submission.value.total,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
    }
  });
}