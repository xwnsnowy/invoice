import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";

import WarningGif from "@/public/warning-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/SubmitButton";
import { DeleteInvoice } from "@/app/action";

async function Authurize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function DeleteInvoiceRoute({
  params,
}: {
  params: Params;
}) {
  const session = await requireAuth();
  const { invoiceId } = await params;
  await Authurize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delte this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="Warning Gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <form
            action={async () => {
              "use server";
              await DeleteInvoice(invoiceId);
            }}
          >
            <SubmitButton text="Delete Invoice" />
          </form>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
