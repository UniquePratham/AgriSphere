import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const region = searchParams.get("region");
  if (!region) {
    return new Response(JSON.stringify({ error: "Region is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    // Step 1: Get lat/lon from city name using Geocoding API
    const geoRes = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );
    if (!geoRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch geocoding data" }),
        {
          status: geoRes.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const geoData = await geoRes.json();
    console.log(geoData);
    return new Response(JSON.stringify(geoData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
