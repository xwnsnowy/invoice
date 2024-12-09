"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface InvoiceActionsProps {
  id: string;
}

export function InvoiceActions({ id }: InvoiceActionsProps) {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email sent successfully!",
        error: "Error sending reminder email!",
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/${id}`}
            className="flex items-center p-2"
          >
            <Pencil className="size-4 mr-3" />
            <span className="text-sm">Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="" className="flex items-center p-2">
            <DownloadCloudIcon className="size-4 mr-3" />
            <span className="text-sm">Dowload</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Link href="" className="flex items-center p-2">
            <Mail className="size-4 mr-3" />
            <span className="text-sm">Reminder Email</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/${id}/delete`}
            className="flex items-center p-2"
          >
            <Trash className="size-4 mr-3" />
            <span className="text-sm">Delete</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/${id}/paid`}
            className="flex items-center p-2"
          >
            <CheckCircle className="size-4 mr-3" />
            <span className="text-sm">Mark as Paid</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
