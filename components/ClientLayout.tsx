"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/login");

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={`flex-1 ${showNavbar ? "pt-16" : ""}`}>
        {children}
      </main>
    </>
  );
}