"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.accessToken) {
        setError(data.error || "Login failed");
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      window.dispatchEvent(new Event("authChange"));
      router.push("/agriculture");
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-teal-200">
        <div className="flex flex-col items-center mb-6">
          <svg
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-teal-600 mb-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm0 0c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm0 8v-4m0 0H8m4 0h4"
            />
          </svg>
          <h2 className="text-3xl font-bold text-teal-700">Login</h2>
          <p className="text-gray-500 mt-1">
            Sign in to access agriculture tools
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow">
            Login
          </Button>
        </form>
        <div className="mt-6 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-600 underline font-medium">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
