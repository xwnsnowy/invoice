import { InvoiceList } from "@/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoicesRoute() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices here!</CardDescription>
          </div>
          <Link href="" className={buttonVariants()}>
            <PlusIcon />
            <span>Create Invoice</span>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceList />
      </CardContent>
    </Card>
  );
}
