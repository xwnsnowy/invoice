"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  text: string;
}

export function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" type="submit">
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
