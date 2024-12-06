"use server";

import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrenct";
import { requireAuth } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { invoiceSchema, onboardingSchema } from "@/app/utils/zodSchema";
import { parseWithZod } from '@conform-to/zod';
import { redirect } from "next/navigation";
import { z } from "zod";
import { addDays } from "date-fns";

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
export type InvoiceData = z.infer<typeof invoiceSchema>;
export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireAuth();
  // if (!session) { return new Response('Unauthorized', { status: 401
  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }



  const invoiceData: InvoiceData = submission.value;

  const invoiceDataWithUserId = {
    ...invoiceData,
    userId: session.user?.id,
  };

  const data = await prisma.invoice.create({ data: invoiceDataWithUserId, });

  // const data = await prisma.invoice.create({
  //   data: {
  //     clientAddress: submission.value.clientAddress,
  //     clientEmail: submission.value.clientEmail,
  //     clientName: submission.value.clientName,
  //     currency: submission.value.currency,
  //     date: submission.value.date,
  //     dueDate: submission.value.dueDate,
  //     invoiceItemDescrption: submission.value.invoiceItemDescrption,
  //     invoiceItemQuantity: submission.value.invoiceItemQuantity,
  //     invoiceItemRate: submission.value.invoiceItemRate,
  //     invoiceName: submission.value.invoiceName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     note: submission.value.note,
  //     status: submission.value.status,
  //     total: submission.value.total,
  //     fromAddress: submission.value.fromAddress,
  //     fromEmail: submission.value.fromEmail,
  //     fromName: submission.value.fromName,
  //   }
  // });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
  };

  const invoiceDate = new Date(submission.value.date);
  const dueDays = submission.value.dueDate;

  const dueDate = addDays(invoiceDate, dueDays);

  emailClient.send({
    from: sender,
    to: [{ email: "tienthanhcute2k2@gmail.com" }],
    template_uuid: "3ed9c4ac-9fad-4a7b-af6a-2fd0466f7449",
    template_variables: {
      "clientName": submission.value.clientName,
      "invoiceNumber": submission.value.invoiceNumber,
      "dueDate": new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(dueDate),
      "totalAmount": formatCurrency({ amount: submission.value.total, currency: submission.value.currency as any }),
      "invoiceLink": "http://localhost:3000/api/invoice/" + data.id
    }
  });

  return redirect("/dashboard/invoices");
}

