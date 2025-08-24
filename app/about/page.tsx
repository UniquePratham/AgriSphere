"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  BarChart3,
  CloudRain,
  Brain,
  Leaf,
  Sun,
  Wheat,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-600 mb-2" />,
    title: "Crop Yield Prediction",
    desc: "Enter field data and get AI-powered yield predictions for multiple crops.",
  },
  {
    icon: <CloudRain className="w-8 h-8 text-blue-500 mb-2" />,
    title: "Weather Dashboard",
    desc: "View past and forecast weather data with interactive charts and horizontal scroll cards.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-500 mb-2" />,
    title: "AgriCopilot",
    desc: "Multilingual farming assistant for crop, weather, and farming queries.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-emerald-700 mb-2" />,
    title: "Eco-AI",
    desc: "Climate impact analyzer for sustainability decisions.",
  },
  {
    icon: <Sun className="w-8 h-8 text-orange-500 mb-2" />,
    title: "AgriVision",
    desc: "Explains farming data in a story form, making yield and weather easy for farmers to grasp",
  },
  {
    icon: <Wheat className="w-8 h-8 text-yellow-700 mb-2" />,
    title: "CropGPT",
    desc: "Your personalized farming ChatGPT for creative crop planning.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">About AgriSphere</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
          Empowering Smart Farming with AI-driven Insights and Yield Predictions
        </p>
        <div className="text-md text-gray-500 max-w-xl mx-auto mt-2">
          <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-200">
            Project for Status Code 2 Hackathon &mdash; Open Innovation Track
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((f, idx) => (
          <Card
            key={f.title}
            className="p-6 flex flex-col items-center text-center shadow">
            <CardHeader>{f.icon}</CardHeader>
            <CardTitle className="mb-2 text-2xl font-semibold">
              {f.title}
            </CardTitle>
            <CardContent className="text-gray-600">{f.desc}</CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/">
          <span className="text-teal-600 hover:underline font-semibold">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
