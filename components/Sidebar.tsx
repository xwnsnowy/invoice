import { DashboardLinks } from "@/components/DashboardLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.png";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex flex-col max-h-screen h-full gap-2">
        <div className="h-14 flex justify-center items-center border-b lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="logo" width={40} height={40} />
            <p className="text-lg font-bold text-foreground">
              Invoice<span className="text-blue-600">Xwnsnowy</span>
            </p>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium">
            <DashboardLinks />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
