"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Database,
  Brain,
  TrendingUp,
  Wheat,
  Menu,
  X,
  Zap,
  Trees,
} from "lucide-react";

const tracks = [
  { name: "AI Chat", icon: Brain, href: "/ai", color: "text-teal-600" },
  {
    name: "Dashboard",
    icon: Wheat,
    href: "/agriculture",
    color: "text-emerald-500",
  },
  { name: "Weather", icon: Cloud, href: "/weather", color: "text-green-600" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check authentication status on mount and listen for login/logout events
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSignedIn(!!localStorage.getItem("accessToken"));
      const handleAuthChange = () => {
        setIsSignedIn(!!localStorage.getItem("accessToken"));
      };
      window.addEventListener("authChange", handleAuthChange);
      return () => window.removeEventListener("authChange", handleAuthChange);
    }
  }, []);

  // Sign out handler
  const handleSignOut = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await fetch("https://agriculture-backend-6ufw.onrender.com/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.dispatchEvent(new Event("authChange"));
      setIsSignedIn(false);
      window.location.href = "/login";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-emerald-600 rounded-lg">
            <Trees className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            AgriSphere
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {tracks.map((track) => (
            <Link
              key={track.name}
              href={track.href}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <track.icon className={`w-4 h-4 ${track.color}`} />
              <span>{track.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => (window.location.href = "/login")}>
              Sign In
            </Button>
          )}
          <Button
            size="sm"
            className="hidden md:inline-flex bg-teal-600 hover:bg-teal-500"
            onClick={() =>
              (window.location.href = isSignedIn ? "/agriculture" : "/register")
            }>
            {isSignedIn ? "Dashboard" : "Get Started"}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-3">
            {tracks.map((track) => (
              <Link
                key={track.name}
                href={track.href}
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                <track.icon className={`w-4 h-4 ${track.color}`} />
                <span>{track.name}</span>
              </Link>
            ))}
            <div className="pt-3 border-t space-y-2">
              {isSignedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => (window.location.href = "/login")}>
                  Sign In
                </Button>
              )}
              <Button
                size="sm"
                className="w-full bg-teal-600"
                onClick={() =>
                  (window.location.href = isSignedIn
                    ? "/agriculture"
                    : "/register")
                }>
                {isSignedIn ? "Dashboard" : "Get Started"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
