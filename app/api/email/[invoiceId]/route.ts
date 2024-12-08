import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
  try {
    const session = await requireAuth();

    const { invoiceId } = await params;

    const data = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!data) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Tien Thanh Cute",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "tienthanhcute2k2@gmail.com" }],
      // subject: "Remind Invoice Payment",
      // text: "Hey you forgot to pay the invoice, please pay it as soon as possible. Thank you.",
      template_uuid: "659eab5c-deff-452c-af85-277ac9447a95",
      template_variables: {
        "first_name": data.clientName,
        "company_info_name": "Invoice Xwnsnowy",
        "company_info_address": "Hanoi, VietNam",
        "company_info_city": "Hanoi",
        "company_info_zip_code": "6886",
        "company_info_country": "VietNam"
      }
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to send Email Reminder" }, { status: 500 });
  }
}