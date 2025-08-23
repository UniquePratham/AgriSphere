"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        return;
      }
      router.push("/login");
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
              d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm6 8a6 6 0 00-12 0"
            />
          </svg>
          <h2 className="text-3xl font-bold text-teal-700">Register</h2>
          <p className="text-gray-500 mt-1">
            Create your account to get started
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleRegister}>
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
          <select
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
          </select>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow">
            Register
          </Button>
        </form>
        <div className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 underline font-medium">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
