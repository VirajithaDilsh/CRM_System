"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Handshake,
  LayoutDashboard,
  Users,
  LogOut,
  UserCircle2,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white">
     
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
            <Handshake className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              CRM
            </h1>

            <p className="text-xs text-gray-500">
              Sales Management
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <link.icon className="h-5 w-5" />

              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
            <UserCircle2 className="h-7 w-7 text-gray-500" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user?.name || "Admin User"}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user?.email || "admin@crm.com"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />

          Logout
        </button>
      </div>
    </aside>
  );
}