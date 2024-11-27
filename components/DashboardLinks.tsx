"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLinkProps {
  id: number;
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGAttributes<SVGSVGElement>>;
}

const dashboardLinks: DashboardLinkProps[] = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            pathname === link.href
              ? "text-primary font-semibold bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "group flex gap-3 items-center rounded-md px-2 mt-1 py-2 text-sm font-medium transition-all"
          )}
        >
          <link.icon className="w-5 h-5" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
