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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Wheat,
  CloudRain,
  Thermometer,
  Droplets,
  Sun,
  Leaf,
  BarChart3,
  MapPin,
  Truck,
  Recycle,
} from "lucide-react";

import { useState, FormEvent } from "react";

const defaultWeatherData = [
  {
    metric: "Temperature",
    value: "Unknown",
    status: "Unknown",
    icon: Thermometer,
  },
  { metric: "Humidity", value: "Unknown", status: "Unknown", icon: Droplets },
  { metric: "Rainfall", value: "Unknown", status: "Unknown", icon: CloudRain },
  { metric: "UV Index", value: "Unknown", status: "Unknown", icon: Sun },
];

const cropData = [
  { crop: "Wheat", yield: 87, health: 92, area: "1,247 acres", icon: Wheat },
  { crop: "Corn", yield: 94, health: 88, area: "2,156 acres", icon: Wheat },
  { crop: "Soybeans", yield: 76, health: 95, area: "987 acres", icon: Leaf },
  { crop: "Rice", yield: 89, health: 91, area: "1,543 acres", icon: Wheat },
];

interface PredictionRequest {
  region: string;
  soil_type: string;
  crop: string;
  rainfall_mm: string;
  temperature_celsius: string;
  fertilizer_used: string;
  irrigation_used: string;
  weather_condition: string;
  days_to_harvest: string;
}

interface WeatherData {
  metric: string;
  value: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
}
interface PredictionData {
  yield: string;
}

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<null | WeatherData[]>(null);
  const [predictionData, setPredictionData] = useState<null | PredictionData>(
    null
  );
  const [formData, setFormData] = useState<null | PredictionRequest>(null);
  // Protect page: redirect to login if not authenticated
  if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
    window.location.href = "/login";
    return null;
  }

  const handlePredictRequest = async (
    predictionRequestData: PredictionRequest
  ) => {
    const res = await fetch("/api/predict-yield", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predictionRequestData),
    });
    const result = await res.json();
    setPredictionData(result);
  };

  const handleWeatherRequest = async (region: string) => {
    try {
      const res = await fetch(`/api/weather?region=${region}`);
      const weather = await res.json();
      if (
        weather &&
        weather.main &&
        weather.weather &&
        weather.weather.length > 0
      ) {
        setWeatherData([
          {
            metric: "Temperature",
            value: `${(weather.main.temp - 273.15).toFixed(2)}°C`,
            status:
              weather.main.temp > 30
                ? "High"
                : weather.main.temp < 15
                ? "Low"
                : "Optimal",
            icon: Thermometer,
          },
          {
            metric: "Humidity",
            value: `${weather.main.humidity}%`,
            status:
              weather.main.humidity > 80
                ? "High"
                : weather.main.humidity < 40
                ? "Low"
                : "Good",
            icon: Droplets,
          },
          {
            metric: "Rainfall",
            value:
              weather.rain && weather.rain["1h"]
                ? `${parseFloat(weather.rain["1h"]).toFixed(2)}mm`
                : "0mm",
            status:
              weather.rain && weather.rain["1h"]
                ? weather.rain["1h"] > 10
                  ? "High"
                  : "Low"
                : "Low",
            icon: CloudRain,
          },
          {
            metric: "Condition",
            value: weather.weather[0].main,
            status: weather.weather[0].description,
            icon: Sun,
          },
        ]);
      }

      console.log(weatherData);
    } catch (err) {
      console.log(err);
      setWeatherData(defaultWeatherData);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      region: form.region.value,
      soil_type: form.soil_type.value,
      crop: form.crop.value,
      rainfall_mm: form.rainfall_mm.value,
      temperature_celsius: form.temperature_celsius.value,
      fertilizer_used: form.fertilizer_used.value,
      irrigation_used: form.irrigation_used.value,
      weather_condition: form.weather_condition.value,
      days_to_harvest: form.days_to_harvest.value,
    };

    setFormData(data);
    handlePredictRequest(data);
    handleWeatherRequest(data.region);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
            <Wheat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Agricultural AI</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered agriculture solutions for sustainable farming and yield
          optimization
        </p>
      </motion.div>

      {/* Crop Yield Prediction Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <span>Crop Yield Prediction</span>
          </CardTitle>
          <CardDescription>
            Enter field data to get AI-powered crop yield prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleFormSubmit}>
            <select
              name="region_select"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md">
              <option value="">Select Region</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Pune">Pune</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="soil_type"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Soil Type"
            />
            <input
              name="crop"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Crop"
            />
            <input
              name="rainfall_mm"
              required
              type="number"
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Rainfall (mm)"
            />
            <input
              name="temperature_celsius"
              required
              type="number"
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Temperature (°C)"
            />
            <input
              name="fertilizer_used"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Fertilizer Used"
            />
            <input
              name="irrigation_used"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Irrigation Used"
            />
            <input
              name="weather_condition"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Weather Condition"
            />
            <input
              name="days_to_harvest"
              required
              type="number"
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Days to Harvest"
            />
            <div className="md:col-span-2 flex justify-end mt-2">
              <Button type="submit">Predict Yield</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Weather Conditions */}
      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherData.map((weather, index) => (
            <motion.div
              key={weather.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {weather.metric}
                  </CardTitle>
                  <weather.icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{weather.value}</div>
                  <div
                    className={`text-xs font-medium ${
                      weather.status === "Optimal"
                        ? "text-green-600"
                        : weather.status === "Good"
                        ? "text-blue-600"
                        : weather.status === "Moderate"
                        ? "text-yellow-600"
                        : weather.status === "High"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}>
                    {weather.status}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Agricultural Dashboard */}
      {predictionData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              <span>Farm Management Dashboard</span>
            </CardTitle>
            <CardDescription>
              AI-powered insights for crop monitoring and yield prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="crops" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="crops">Crop Monitor</TabsTrigger>
                <TabsTrigger value="prediction">Yield Prediction</TabsTrigger>
                <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
                <TabsTrigger value="supply">Supply Chain</TabsTrigger>
              </TabsList>

              <TabsContent value="crops" className="space-y-4">
                <div className="space-y-4">
                  {cropData.map((crop, index) => (
                    <motion.div
                      key={crop.crop}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <crop.icon className="w-5 h-5 text-emerald-500" />
                          <div>
                            <h4 className="font-medium">{crop.crop}</h4>
                            <p className="text-sm text-muted-foreground">
                              {crop.area}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            Health Score
                          </div>
                          <div className="text-lg font-bold text-emerald-600">
                            {crop.health}%
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Predicted Yield</span>
                          <span className="font-medium">{crop.yield}%</span>
                        </div>
                        <Progress value={crop.yield} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="prediction" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        AI Yield Prediction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Season Forecast</span>
                        <span className="font-medium text-emerald-600">
                          {predictionData.yield}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Confidence Level</span>
                        <span className="font-medium">
                          {Math.floor(Math.random() * 15 + 80) + "%"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Risk Factors</span>
                        <span className="font-medium text-yellow-600">
                          2 identified
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Market Predictions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Price Forecast</span>
                        <span className="font-medium text-green-600">
                          +12.3%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Demand Trend</span>
                        <span className="font-medium">Increasing</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Optimal Harvest</span>
                        <span className="font-medium">Oct 15-22</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="soil" className="space-y-4">
                <div className="text-center space-y-4">
                  <Leaf className="w-12 h-12 mx-auto text-emerald-500" />
                  <h3 className="text-lg font-medium">
                    Soil Health Assessment
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    AI-powered soil analysis using satellite imagery and IoT
                    sensor data.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="p-4 border rounded-lg">
                      <div className="text-lg font-bold text-emerald-600">
                        8.2
                      </div>
                      <div className="text-sm text-muted-foreground">
                        pH Level
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-lg font-bold text-blue-600">67%</div>
                      <div className="text-sm text-muted-foreground">
                        Moisture
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">
                        High
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Nutrients
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="supply" className="space-y-4">
                <div className="space-y-6">
                  <div className="text-center">
                    <Truck className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
                    <h3 className="text-lg font-medium">
                      Supply Chain Optimization
                    </h3>
                    <p className="text-muted-foreground">
                      AI-driven logistics and distribution optimization
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="text-center">
                        <MapPin className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                        <CardTitle className="text-lg">
                          Route Optimization
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          -23%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Transport Costs
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="text-center">
                        <Truck className="w-8 h-8 mx-auto text-green-500 mb-2" />
                        <CardTitle className="text-lg">Delivery Time</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          -18%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average Delay
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="text-center">
                        <Recycle className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                        <CardTitle className="text-lg">
                          Sustainability
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          +31%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Carbon Efficiency
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
