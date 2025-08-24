"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Brain } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIChatPage() {
  type Feature = {
    name: string;
    endpoint: string;
    description: string;
    example: string;
    color: string;
    payload: any;
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const [formData, setFormData] = useState({
    year: 2024,
    crop: "",
    region_state: "",
    region_district: "",
    region_village: "",
    soil_quality: "",
    rainfall: "",
    temperature: "",
    ndvi: "",
    yield_value: "",
    yield_unit: "kg/ha",
    season: "",
    water_usage: "",
    user_message: "",
    language: "english",
  });
  const [response, setResponse] = useState<null | {
    message: string;
    type: string;
    sucess: boolean;
  }>(null);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDialogOpen = (feature: Feature) => {
    setActiveFeature(feature);
    setDialogOpen(true);
    setResponse(null);
    setFormData({
      year: 2024,
      crop: "",
      region_state: "",
      region_district: "",
      region_village: "",
      soil_quality: "",
      rainfall: "",
      temperature: "",
      ndvi: "",
      yield_value: "",
      yield_unit: "kg/ha",
      season: "",
      water_usage: "",
      user_message: feature.example,
      language: "english",
    });
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setActiveFeature(null);
    setResponse(null);
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeFeature) return;
    setLoading(true);
    const payload: any = {
      user_id: "64f12ab34cd56789ef012345",
      session_id: `session_${activeFeature!.endpoint.replace("/", "")}_001`,
      user_message: formData.user_message,
      year: Number(formData.year),
      crop: formData.crop,
      region: {
        state: formData.region_state,
        district: formData.region_district,
        ...(formData.region_village && { village: formData.region_village }),
      },
      soil_quality: Number(formData.soil_quality),
      rainfall: Number(formData.rainfall),
      temperature: Number(formData.temperature),
      ndvi: Number(formData.ndvi),
      yield: {
        value: Number(formData.yield_value),
        unit: formData.yield_unit,
      },
      season: formData.season,
      ...(formData.water_usage && {
        water_usage: Number(formData.water_usage),
      }),
      ...(activeFeature?.endpoint === "/copilot" && {
        language: formData.language,
      }),
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/agri${
          activeFeature!.endpoint
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      console.log(payload);
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Error fetching data" } as any);
    } finally {
      setLoading(false);
    }
  };
  // Protect page: redirect to login if not authenticated
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
      window.location.href = "/login";
    }
  }, []);

  // Feature cards data
  const features = [
    {
      name: "AgriCopilot",
      headingColor: "text-green-700",
      endpoint: "/copilot",
      description:
        "Multilingual Farming Assistant. Ask questions about crops, weather, and farming in any language.",
      example: "क्या इस साल गेहूं उगाना सही रहेगा?",
      color: "bg-green-100 border-green-300",
      payload: {
        user_id: "64f12ab34cd56789ef012345",
        session_id: "session_copilot_001",
        user_message: "क्या इस साल गेहूं उगाना सही रहेगा?",
        year: 2024,
        crop: "wheat",
        region: { state: "Punjab", district: "Amritsar", village: "Majitha" },
        soil_quality: 0.75,
        rainfall: 1100,
        temperature: 26,
        ndvi: 0.65,
        yield: { value: 3600, unit: "kg/ha" },
        season: "rabi",
      },
    },
    {
      name: "AgriVision",
      headingColor: "text-blue-700",
      endpoint: "/vision",
      description:
        "Yield Predictor & Storytelling. Get predictions and insights for crop yield and farming stories.",
      example: "Tell me about the expected rice yield this season.",
      color: "bg-blue-100 border-blue-300",
      payload: {
        user_id: "64f12ab34cd56789ef012345",
        session_id: "session_vision_001",
        user_message: "Tell me about the expected rice yield this season.",
        year: 2024,
        crop: "rice",
        region: { state: "West Bengal", district: "Nadia" },
        soil_quality: 0.82,
        rainfall: 1500,
        temperature: 30,
        ndvi: 0.72,
        yield: { value: 4200, unit: "kg/ha" },
        season: "kharif",
      },
    },
    {
      name: "CropGPT",
      headingColor: "text-yellow-700",
      endpoint: "/crop-gpt",
      description:
        "Market & Profitability Insights. Discover the best crop for your region and maximize profit.",
      example: "What's the best crop for me this season?",
      color: "bg-yellow-100 border-yellow-300",
      payload: {
        user_id: "64f12ab34cd56789ef012345",
        session_id: "session_cropgpt_001",
        user_message: "What's the best crop for me this season?",
        year: 2024,
        crop: "maize",
        region: { state: "Madhya Pradesh", district: "Indore" },
        soil_quality: 0.7,
        rainfall: 950,
        temperature: 29,
        ndvi: 0.6,
        yield: { value: 2800, unit: "kg/ha" },
        season: "kharif",
      },
    },
    {
      name: "AgriChat",
      headingColor: "text-purple-700",
      endpoint: "/chat",
      description:
        "Creative Brainstorming Mode. Explore new ideas, crop combinations, and farming strategies.",
      example: "What if I grow pulses and sugarcane together?",
      color: "bg-purple-100 border-purple-300",
      payload: {
        user_id: "64f12ab34cd56789ef012345",
        session_id: "session_chat_001",
        user_message: "What if I grow pulses and sugarcane together?",
        year: 2024,
        crop: "pulses",
        region: { state: "Uttar Pradesh", district: "Varanasi" },
        soil_quality: 0.8,
        rainfall: 1000,
        temperature: 27,
        ndvi: 0.7,
        yield: { value: 2500, unit: "kg/ha" },
        season: "zaid",
      },
    },
  ];
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your agriculture AI assistant. Ask me anything about crop prediction, weather, soil, or farming!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setInput("");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/gemini/gemini-call`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
          }
        );
        const data = await res.json();
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "ai",
            text: data?.message || "(No response from AI)",
          },
        ]);
      } catch (err) {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "ai",
            text: "Error: Could not get response from AI.",
          },
        ]);
      }
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-lg">
            <Brain className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold">Innovating Agriculture with AI</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore smart farming tools powered by AI. Choose a feature below to
          get started!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {features.map((feature, idx) => (
          <div
            key={feature.endpoint}
            className={`border-2 ${feature.color} rounded-xl p-6 shadow flex flex-col justify-between h-full`}>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${feature.headingColor}`}>
                {feature.name}
              </h3>
              <p className="text-gray-700 mb-2">{feature.description}</p>
              <div className="bg-gray-50 border rounded px-3 py-2 text-xs text-gray-600 mb-2">
                <span className="font-semibold">Example:</span>{" "}
                {feature.example}
              </div>
            </div>
            <Button
              className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow"
              onClick={() => handleDialogOpen(feature)}>
              Ask {feature.name}
            </Button>
            {/* Modal Dialog for feature input */}
            {dialogOpen && (
              <div className="fixed inset-0 z-50 flex md:items-center md:justify-center bg-black bg-opacity-40">
                <div className="bg-white md:rounded-xl shadow-xl p-8 w-full md:max-w-4xl relative">
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-rose-600 text-4xl"
                    onClick={handleDialogClose}>
                    ×
                  </button>
                  <h2 className="text-2xl font-bold mb-4">
                    {activeFeature?.name}
                  </h2>
                  <form className="space-y-3" onSubmit={handleFormSubmit}>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        name="year"
                        type="number"
                        min="2000"
                        max="2100"
                        required
                        value={formData.year}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="Year"
                        // ...existing code...
                        // Removed erroneous input for crop selection
                      />
                      <select
                        name="crop"
                        required
                        value={formData.crop}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full">
                        <option value="">Select Crop</option>
                        <option value="wheat">Wheat</option>
                        <option value="rice">Rice</option>
                        <option value="maize">Maize</option>
                        <option value="cotton">Cotton</option>
                        <option value="sugarcane">Sugarcane</option>
                        <option value="pulses">Pulses</option>
                        <option value="oilseeds">Oilseeds</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="tea">Tea</option>
                        <option value="coffee">Coffee</option>
                        <option value="spices">Spices</option>
                        <option value="other">Other</option>
                      </select>

                      <input
                        name="region_state"
                        required
                        value={formData.region_state}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="State"
                      />
                      <input
                        name="region_district"
                        required
                        value={formData.region_district}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="District"
                      />
                      <input
                        name="region_village"
                        value={formData.region_village}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="Village (optional)"
                      />
                      <input
                        name="soil_quality"
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        required
                        value={formData.soil_quality}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="Soil Quality (0-1)"
                      />
                      <input
                        name="rainfall"
                        type="number"
                        required
                        value={formData.rainfall}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="Rainfall (mm)"
                      />
                      <input
                        name="temperature"
                        type="number"
                        min={0}
                        max={70}
                        required
                        value={formData.temperature}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="Temperature (°C)"
                      />
                      <input
                        name="ndvi"
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        required
                        value={formData.ndvi}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                        placeholder="NDVI (0-1)"
                      />
                      <div className="flex gap-2 items-center">
                        <input
                          name="yield_value"
                          type="number"
                          required
                          value={formData.yield_value}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full"
                          placeholder="Yield Value"
                        />
                        <select
                          name="yield_unit"
                          required
                          value={formData.yield_unit}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-auto text-xs">
                          <option value="kg/ha">kg/ha</option>
                          <option value="quintals/acre">quintals/acre</option>
                          <option value="tons/ha">tons/ha</option>
                          <option value="quintals/ha">quintals/ha</option>
                          <option value="kg/acre">kg/acre</option>
                        </select>
                      </div>
                      <select
                        name="season"
                        required
                        value={formData.season}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full">
                        <option value="">Select Season</option>
                        <option value="kharif">Kharif</option>
                        <option value="rabi">Rabi</option>
                        <option value="zaid">Zaid</option>
                        <option value="kharif">Autumn</option>
                        <option value="spring">Spring</option>
                        <option value="winter">Winter</option>
                        <option value="monsoon">Monsoon</option>
                        <option value="whole year">Whole Year</option>
                      </select>
                      {activeFeature?.endpoint === "/eco-ai" && (
                        <input
                          name="water_usage"
                          type="number"
                          required
                          value={formData.water_usage}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full"
                          placeholder="Water Usage (L/acre)"
                        />
                      )}
                    </div>
                    <label className="m t-2 block">
                      Question
                      <input
                        name="user_message"
                        required
                        value={formData.user_message}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mt-2"
                        placeholder="Question"
                      />
                    </label>
                    {activeFeature?.endpoint === "/copilot" && (
                      <>
                        <label className="block mt-2">Response Language</label>
                        <select
                          name="language"
                          required
                          value={formData.language}
                          onChange={handleInputChange}
                          className="border p-2 rounded w-full">
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="bengali">Bengali</option>
                          <option value="marathi">Marathi</option>
                          <option value="tamil">Tamil</option>
                          <option value="telugu">Telugu</option>
                          <option value="gujarati">Gujarati</option>
                          <option value="punjabi">Punjabi</option>
                          <option value="urdu">Urdu</option>
                          <option value="other">Other</option>
                        </select>
                      </>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow mt-4"
                      disabled={loading}>
                      {loading ? "Loading..." : "Submit"}
                    </Button>
                  </form>
                  {response && (
                    <div className="mt-6 p-4 bg-gray-100 rounded text-lg font-medium max-h-60 overflow-auto">
                      {response?.message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Existing chat UI below the cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 mb-4">
        <h2 className="text-xl font-semibold">AI Chat</h2>
        <p className="text-gray-500">
          Chat with AgriCopilot for instant answers and advice.
        </p>
      </motion.div>
      <div className="border max-h-[700px] overflow-y-auto rounded-lg p-4 min-h-[350px] bg-muted/20 flex flex-col gap-4 bgteal">
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
              {msg.sender === "ai" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
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
