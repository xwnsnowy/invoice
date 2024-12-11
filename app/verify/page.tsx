import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <Card className="w-[398px] px-5">
        <CardHeader className="text-center">
          <div className="mb-2 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We have sent a verification link to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-1 rounded-md bg-red-200 border-yellow-300 p-4">
            <div className="flex justify-center items-center gap-2">
              <AlertCircle className="size-5 text-yellow-700" />

              <span className="text-sm font-medium text-yellow text-nowrap">
                Be sure to check your spam folder!
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/dashboard"
            className={buttonVariants({
              className: "w-full",
              variant: "outline",
            })}
          >
            <ArrowLeft className="mr-2 size-4" />
            <span>Back to Homepage</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
