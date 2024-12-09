import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/SubmitButton";
import { markAsPaid } from "@/app/action";
import { requireAuth } from "@/app/utils/hooks";
import { authorizeInvoice } from "@/app/services/invoiceService";

type Params = Promise<{ invoiceId: string }>;

export default async function MarkAsPaid({ params }: { params: Params }) {
  const session = await requireAuth();
  const { invoiceId } = await params;
  await authorizeInvoice(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Mark as paid</CardTitle>
          <CardDescription>
            Are you sure that you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt="Paid Gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <form
            action={async () => {
              "use server";
              await markAsPaid(invoiceId);
            }}
          >
            <SubmitButton text="Mark as paid" variant="destructive" />
          </form>
          <Link className={buttonVariants()} href="/dashboard/invoices">
            Cancel
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
