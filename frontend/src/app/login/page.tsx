"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Assuming you already have these components
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">CRM</span>
            </div>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
              Sign in to CRM
            </h2>
          </div>

          <form className="space-y-6 mt-4" onSubmit={handleLogin}>
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="text-black"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="text-black"
            />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          {/* 🔹 Demo credentials */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Use{" "}
            <span className="font-medium text-gray-900">admin@example.com</span>{" "}
            and <span className="font-medium text-gray-900">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
