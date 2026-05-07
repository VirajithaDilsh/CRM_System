"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    queueMicrotask(() => {
      setIsAuthenticated(true);
    });
  }, [router]);

  if (isAuthenticated === null) {
    return <p className="p-6">Checking authentication...</p>;
  }

  return <>{children}</>;
}