"use client";

import { useState } from "react";

type MarketPrice = {
  date: string;
  market_name: string;
  variety: string;
  min_price_per_quintal: number;
  max_price_per_quintal: number;
  modal_price_per_quintal: number;
};
import { Card } from "@/components/ui/card";

export default function MarketPricePage() {
  const [data, setData] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const commodities = [
    "potato",
    "onion",
    "tomato",
    "rice",
    "wheat",
    "maize",
    "sugarcane",
    "pulses",
    "cotton",
    "mustard",
    "groundnut",
  ];
  const states = [
    "West Bengal",
    "Uttar Pradesh",
    "Punjab",
    "Maharashtra",
    "Gujarat",
    "Tamil Nadu",
    "Karnataka",
    "Bihar",
    "Rajasthan",
    "Madhya Pradesh",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData([]);
    const today = new Date().toISOString().slice(0, 10);
    if (!commodity || !state || !startDate || !endDate) {
      setError("Please select all parameters.");
      setLoading(false);
      return;
    }
    if (endDate > today) {
      setError("End date cannot be in the future.");
      setLoading(false);
      return;
    }
    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      setLoading(false);
      return;
    }
    const url = `${
      process.env.NEXT_PUBLIC_BACKEND_API_URL
    }/gemini/commodity-market-data?commodity=${encodeURIComponent(
      commodity
    )}&state=${encodeURIComponent(state)}&startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(endDate)}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Error fetching market prices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Market Prices</h1>
      <Card className="p-6 shadow mb-8">
        <form
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
          onSubmit={handleSubmit}>
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="border p-2 rounded w-48"
            required>
            <option value="">Select Commodity</option>
            {commodities.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-2 rounded w-48"
            required>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-40"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-40"
            required
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded font-semibold hover:bg-teal-700"
            disabled={loading}>
            {loading ? "Loading..." : "Show Prices"}
          </button>
        </form>
      </Card>
      <Card className="p-6 shadow">
        {loading ? (
          <div className="text-center py-8 text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No data to show. Please select parameters and submit.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-teal-100">
                <tr>
                  <th className="px-3 py-2 border">Date</th>
                  <th className="px-3 py-2 border">Market</th>
                  <th className="px-3 py-2 border">Variety</th>
                  <th className="px-3 py-2 border">Min Price (₹/quintal)</th>
                  <th className="px-3 py-2 border">Max Price (₹/quintal)</th>
                  <th className="px-3 py-2 border">Modal Price (₹/quintal)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-3 py-2 border">{row.date}</td>
                    <td className="px-3 py-2 border">{row.market_name}</td>
                    <td className="px-3 py-2 border">{row.variety}</td>
                    <td className="px-3 py-2 border">
                      {row.min_price_per_quintal}
                    </td>
                    <td className="px-3 py-2 border">
                      {row.max_price_per_quintal}
                    </td>
                    <td className="px-3 py-2 border">
                      {row.modal_price_per_quintal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
