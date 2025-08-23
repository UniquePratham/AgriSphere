"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Brain } from "lucide-react";

export default function AIChatPage() {
  // Protect page: redirect to login if not authenticated
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
      window.location.href = "/login";
    }
  }, []);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your agriculture AI assistant. Ask me anything about crop prediction, weather, soil, or farming!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "ai",
            text: "(AI response about agriculture will appear here.)",
          },
        ]);
      }, 1200);
    }
  };

  return (
    <div className="container px-4 py-8  mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Agriculture AI Chat</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get instant answers and advice for crop prediction, weather, soil, and
          smart farming.
        </p>
      </motion.div>

      <div className="border max-h-[700px] overflow-y-auto rounded-lg p-4 min-h-[350px] bg-muted/20 flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "ai" ? "justify-start" : "justify-end"
            }`}>
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "ai"
                  ? "bg-background text-gray-800"
                  : "bg-green-100 text-green-900"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-full hover:border hover:border-teal-300"
          placeholder="Type your agriculture question..."
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-teal-600 hover:bg-teal-800"
          disabled={!input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
