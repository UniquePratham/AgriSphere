"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeatherPage() {
  const [region, setRegion] = useState("kolkata");
  const [duration, setDuration] = useState(5);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("past");

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Fetch forecast
      const forecastRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/agri/weather/forecast?region=${region}&duration=${duration}`
      );
      const forecastData = await forecastRes.json();
      // Fetch past weather
      const pastRes = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_API_URL
        }/agri/weather/past?region=${region}&duration=${30}`
      );
      const pastData = await pastRes.json();
      setWeatherData({ forecast: forecastData, past: pastData });
      console.log({ forecast: forecastData, past: pastData });
    } catch (error) {
      console.log(error);
      alert("Could not get weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Split data into past and forecast
  const past = weatherData?.past?.data || [];
  const forecast = weatherData?.forecast?.data || [];

  // Chart data
  const tempChartData = (data: any[]) => ({
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((d) => d.temperature),
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20,184,166,0.2)",
      },
    ],
  });

  const humidityChartData = (data: any[]) => ({
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Humidity (%)",
        data: data.map((d) => d.humidity),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
      },
    ],
  });

  const windChartData = (data: any[]) => ({
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Wind Speed (m/s)",
        data: data.map((d) => d.wind_speed),
        borderColor: "#f59e42",
        backgroundColor: "rgba(245,158,66,0.2)",
      },
    ],
  });

  const singleChartOptions = (title: string, yLabel: string) => ({
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: title },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: yLabel },
        beginAtZero: true,
      } as any,
    },
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Weather Data" },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Temperature (°C)" },
        beginAtZero: true,
      } as any,
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Humidity (%)" },
        grid: { drawOnChartArea: false },
        beginAtZero: true,
      } as any,
      y2: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Wind Speed (m/s)" },
        grid: { drawOnChartArea: false },
        beginAtZero: true,
      } as any,
    },
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Weather Dashboard</h1>
      <div className="flex gap-4 mb-6 justify-center">
        <input
          className="border p-2 rounded"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Region (e.g. kolkata)"
        />
        <input
          className="border p-2 rounded w-24"
          type="number"
          min={1}
          max={7}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Days"
        />
        <Button
          onClick={() => fetchWeather()}
          disabled={duration < 1 || duration > 7}>
          Refresh
        </Button>
      </div>
      <Tabs defaultValue="past" className="space-y-4 mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="past">Past Weather</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="past" className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <svg
                className="animate-spin h-8 w-8 text-teal-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          ) : past?.length ? (
            <>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max">
                  {past.map((d: any, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-lg p-4 min-w-[160px] flex flex-col items-center">
                      <div className="text-2xl font-bold mb-1">
                        {d.temperature.toFixed(1)}°C
                      </div>
                      <div className="mb-1 text-xl">
                        {d.condition?.toLowerCase().includes("cloud")
                          ? "☁️"
                          : d.condition?.toLowerCase().includes("rain")
                          ? "🌧️"
                          : d.condition?.toLowerCase().includes("storm")
                          ? "⛈️"
                          : "🌤️"}
                        <span className="ml-1">{d.weather}</span>
                      </div>
                      <div className="text-sm">Humidity: {d.humidity}%</div>
                      <div className="text-sm">Wind: {d.wind_speed} m/s</div>
                      <div className="text-xs mt-1">{d.date}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-8">
                <Line
                  data={tempChartData(past)}
                  options={singleChartOptions(
                    "Temperature",
                    "Temperature (°C)"
                  )}
                />
                <Line
                  data={humidityChartData(past)}
                  options={singleChartOptions("Humidity", "Humidity (%)")}
                />
                <Line
                  data={windChartData(past)}
                  options={singleChartOptions("Wind Speed", "Wind Speed (m/s)")}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No past weather data available.
            </div>
          )}
        </TabsContent>
        <TabsContent value="forecast" className="space-y-4">
          {duration < 1 || duration > 7 ? (
            <div className="text-center text-red-500 font-semibold">
              Weather forecast could not be obtained. Please select 1-7 days.
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <svg
                className="animate-spin h-8 w-8 text-teal-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          ) : forecast?.length ? (
            <>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max">
                  {forecast.map((d: any, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-lg p-4 min-w-[160px] flex flex-col items-center">
                      <div className="text-lg font-bold mb-1">
                        {d.time || d.date}
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {(d.temperature - 273.15).toFixed(1)}°C
                      </div>
                      <div className="mb-1 text-xl">
                        {d.condition?.toLowerCase().includes("cloud")
                          ? "☁️"
                          : d.condition?.toLowerCase().includes("rain")
                          ? "🌧️"
                          : d.condition?.toLowerCase().includes("storm")
                          ? "⛈️"
                          : "🌤️"}
                        <span className="ml-1">{d.weather}</span>
                      </div>
                      <div className="text-sm">Humidity: {d.humidity}%</div>
                      <div className="text-sm">Wind: {d.wind_speed} m/s</div>
                      <div className="text-xs mt-1">{d.date}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-8">
                <Line
                  data={tempChartData(forecast)}
                  options={singleChartOptions(
                    "Temperature",
                    "Temperature (°C)"
                  )}
                />
                <Line
                  data={humidityChartData(forecast)}
                  options={singleChartOptions("Humidity", "Humidity (%)")}
                />
                <Line
                  data={windChartData(forecast)}
                  options={singleChartOptions("Wind Speed", "Wind Speed (m/s)")}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No forecast data available.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
