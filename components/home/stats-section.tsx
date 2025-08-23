"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    label: "Predicted Wheat Yield",
    value: 87,
    max: 100,
    color: "bg-teal-200",
  },
  { label: "Predicted Corn Yield", value: 94, max: 100, color: "bg-teal-200" },
  { label: "AI Accuracy", value: 92, max: 100, color: "bg-teal-200" },
  {
    label: "Farmers Benefited",
    value: 1500,
    max: 2000,
    color: "bg-teal-200",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Crop Prediction Analytics</h2>
          <p className="text-lg text-muted-foreground">
            Real-time AI-powered insights for crop yield prediction and
            agriculture impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {stat.label}
                  </div>
                  <Progress
                    value={(stat.value / stat.max) * 100}
                    className={`h-2 ${stat.color} accent-teal-600 text-teal-600`}
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    {Math.round((stat.value / stat.max) * 100)}% of target
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
