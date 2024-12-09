"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="w-full"
      type="submit"
      variant={variant}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
