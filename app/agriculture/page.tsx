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

interface PredictRequest {
  Crop: string;
  Crop_Year: number;
  Season: string;
  State: string;
  Area: number;
  Production: number;
  Annual_Rainfall: number;
  Fertilizer: number;
  Pesticide: number;
}

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

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<null | WeatherData[]>(null);
  const [predictionData, setPredictionData] = useState<null | number>(null);
  const [formData, setFormData] = useState<null | PredictionRequest>(null);
  const [monitorCrops, setMonitorCrops] = useState<any[]>([]);
  // Protect page: redirect to login if not authenticated
  if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
    window.location.href = "/login";
    return null;
  }

  // Predict yields for multiple crops and update monitorCrops
  const handlePredictRequest = async (baseRequest: PredictRequest) => {
    const cropsToMonitor = ["Wheat", "Rice", "Maize", "Sugarcane", "Soyabean"];
    const results: any[] = [];
    for (const crop of cropsToMonitor) {
      const req = { ...baseRequest, Crop: crop };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PREDICTION_MODEL_URL}/predict`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
          }
        );
        const result = await res.json();
        results.push({
          crop,
          yield: result.Yield,
          area: req.Area,
          health: Math.floor(Math.random() * 20 + 80), // Simulated health
        });
      } catch (err) {
        results.push({ crop, yield: null, area: req.Area, health: null });
      }
    }
    setMonitorCrops(results);
    setPredictionData(results[0]?.yield ?? null); // Show first crop's yield in prediction tab
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
              weather.main.temp - 273.15 > 30
                ? "High"
                : weather.main.temp - 273.15 < 15
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
    } catch (err) {
      console.log(err);
      setWeatherData(defaultWeatherData);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data: PredictRequest = {
      Crop: form.Crop.value,
      Crop_Year: Number(form.Crop_Year.value),
      Season: form.Season.value,
      State: form.State.value,
      Area: Number(form.Area.value),
      Production: Number(form.Production.value),
      Annual_Rainfall: Number(form.Annual_Rainfall.value),
      Fertilizer: Number(form.Fertilizer.value),
      Pesticide: Number(form.Pesticide.value),
    };
    setFormData(data as any);
    handlePredictRequest(data);
    handleWeatherRequest(data.State);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-lg">
            <Wheat className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold">Innovating Agriculture with AI</h1>
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
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data: PredictRequest = {
                Crop: form.Crop.value,
                Crop_Year: Number(form.Crop_Year.value),
                Season: form.Season.value,
                State: form.State.value,
                Area: Number(form.Area.value),
                Production: Number(form.Production.value),
                Annual_Rainfall: Number(form.Annual_Rainfall.value),
                Fertilizer: Number(form.Fertilizer.value),
                Pesticide: Number(form.Pesticide.value),
              };
              setFormData(data as any);
              await handlePredictRequest(data);
              handleWeatherRequest(data.State);
            }}>
            {/* ...existing crop, year, season, state, area, production, rainfall, fertilizer, pesticide fields... */}
            <select
              name="Crop"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md">
              <option value="">Select Crop</option>
              <option value="Arecanut">Arecanut</option>
              <option value="Arhar/Tur">Arhar/Tur</option>
              <option value="Bajra">Bajra</option>
              <option value="Banana">Banana</option>
              <option value="Barley">Barley</option>
              <option value="Black pepper">Black pepper</option>
              <option value="Cardamom">Cardamom</option>
              <option value="Cashewnut">Cashewnut</option>
              <option value="Castor seed">Castor seed</option>
              <option value="Coconut">Coconut</option>
              <option value="Coriander">Coriander</option>
              <option value="Cotton(lint)">Cotton(lint)</option>
              <option value="Cowpea(Lobia)">Cowpea(Lobia)</option>
              <option value="Dry chillies">Dry chillies</option>
              <option value="Garlic">Garlic</option>
              <option value="Ginger">Ginger</option>
              <option value="Gram">Gram</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Guar seed">Guar seed</option>
              <option value="Horse-gram">Horse-gram</option>
              <option value="Jowar">Jowar</option>
              <option value="Jute">Jute</option>
              <option value="Khesari">Khesari</option>
              <option value="Linseed">Linseed</option>
              <option value="Maize">Maize</option>
              <option value="Masoor">Masoor</option>
              <option value="Mesta">Mesta</option>
              <option value="Moong(Green Gram)">Moong(Green Gram)</option>
              <option value="Moth">Moth</option>
              <option value="Niger seed">Niger seed</option>
              <option value="Oilseeds total">Oilseeds total</option>
              <option value="Onion">Onion</option>
              <option value="Other  Rabi pulses">Other Rabi pulses</option>
              <option value="Other Cereals">Other Cereals</option>
              <option value="Other Kharif pulses">Other Kharif pulses</option>
              <option value="Other Summer Pulses">Other Summer Pulses</option>
              <option value="Peas & beans (Pulses)">
                Peas & beans (Pulses)
              </option>
              <option value="Potato">Potato</option>
              <option value="Ragi">Ragi</option>
              <option value="Rapeseed &Mustard">Rapeseed &Mustard</option>
              <option value="Rice">Rice</option>
              <option value="Safflower">Safflower</option>
              <option value="Sannhamp">Sannhamp</option>
              <option value="Sesamum">Sesamum</option>
              <option value="Small millets">Small millets</option>
              <option value="Soyabean">Soyabean</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Sweet potato">Sweet potato</option>
              <option value="Tapioca">Tapioca</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Turmeric">Turmeric</option>
              <option value="Urad">Urad</option>
              <option value="Wheat">Wheat</option>
              <option value="other oilseeds">other oilseeds</option>
            </select>
            <input
              name="Crop_Year"
              required
              type="number"
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Crop Year (e.g. 2020)"
            />
            <select
              name="Season"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md">
              <option value="">Select Season</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Spring">Whole Year</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Winter</option>
            </select>
            <select
              name="State"
              required
              className="input input-bordered p-2 border border-gray-300 rounded-md">
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Punjab">Punjab</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <input
              name="Area"
              required
              type="number"
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Area (hectare)"
            />
            <input
              name="Production"
              required
              type="number"
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Production (kg)"
            />
            <input
              name="Annual_Rainfall"
              required
              type="number"
              min={0}
              max={2000}
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Annual Rainfall (mm)"
            />
            <input
              name="Fertilizer"
              required
              type="number"
              min={0}
              max={1000}
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Fertilizer (kg/ha)"
            />
            <input
              name="Pesticide"
              required
              type="number"
              min={0}
              max={1000}
              className="input input-bordered p-2 border border-gray-300 rounded-md"
              placeholder="Pesticide (kg/ha)"
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
      {monitorCrops.length > 0 && predictionData && (
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
                  {monitorCrops.map((crop, index) => (
                    <motion.div
                      key={crop.crop}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Wheat className="w-5 h-5 text-emerald-500" />
                          <div>
                            <h4 className="font-medium">{crop.crop}</h4>
                            <p className="text-sm text-muted-foreground">
                              Area: {crop.area}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            Health Score
                          </div>
                          <div className="text-lg font-bold text-emerald-600">
                            {crop.health ? `${crop.health}%` : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Predicted Yield</span>
                          <span className="font-medium">
                            {crop.yield !== null
                              ? `${crop.yield.toFixed(2)} kg/ha`
                              : "N/A"}
                          </span>
                        </div>
                        <Progress value={crop.yield ?? 0} className="h-2" />
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
                          {predictionData.toFixed(2)} kg/ha
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
