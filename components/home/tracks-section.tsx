"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Cloud,
  Database,
  Brain,
  TrendingUp,
  Wheat,
  ArrowRight,
  Activity,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    name: "Crop Yield Prediction",
    icon: Wheat,
    color: "from-gray-500 to-green-500",
    description:
      "AI-powered prediction of crop yields for smarter planning and resource allocation.",
    details: [
      "Wheat, Corn, Rice, Soybeans",
      "Seasonal Forecasts",
      "Historical Data Analysis",
    ],
    href: "/agriculture",
  },
  {
    name: "Weather Analysis",
    icon: Cloud,
    color: "from-green-500 to-cyan-500",
    description:
      "Real-time weather insights and forecasts for agricultural decision-making.",
    details: [
      "Temperature & Rainfall Trends",
      "Drought & Flood Alerts",
      "Microclimate Mapping",
    ],
    href: "/agriculture",
  },
  {
    name: "Soil Assessment",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    description:
      "AI-driven soil health analysis for optimal crop growth and sustainability.",
    details: [
      "pH & Nutrient Levels",
      "Moisture Monitoring",
      "Satellite & IoT Data",
    ],
    href: "/agriculture",
  },
  {
    name: "AI Chat for Farmers",
    icon: Brain,
    color: "from-emerald-500 to-cyan-500",
    description:
      "Conversational AI assistant for farming advice, troubleshooting, and support.",
    details: [
      "24/7 Support",
      "Natural Language Queries",
      "Personalized Recommendations",
    ],
    href: "/ai",
  },
  {
    name: "Supply Chain Optimization",
    icon: Activity,
    color: "from-emerald-500 to-green-500",
    description:
      "Streamline logistics and distribution for agricultural products using AI.",
    details: [
      "Route Planning",
      "Inventory Management",
      "Market Price Forecasts",
    ],
    href: "/agriculture",
  },
];

export function TracksSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4">
            Agriculture Feature Cards
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover AI-powered agriculture features for smarter, data-driven
            farming and yield optimization.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link href={feature.href}>
                      Explore Feature
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
            <p className="text-muted-foreground">
              Monitor all platform activities, user engagement, and system
              performance in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">High Performance</h3>
            <p className="text-muted-foreground">
              Optimized for speed and scalability with advanced caching and CDN
              integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Enterprise Security</h3>
            <p className="text-muted-foreground">
              Bank-level security with encryption, authentication, and
              comprehensive audit trails.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
