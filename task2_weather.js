const https = require("https");

const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error("Error: Please set your OPENWEATHER_API_KEY environment variable.");
  console.error("Example (PowerShell): $env:OPENWEATHER_API_KEY = 'your_key_here'");
  process.exit(1);
}

const url = `https://api.openweathermap.org/data/2.5/forecast?q=Jakarta&appid=${apiKey}&units=metric`;

https.get(url, (res) => {
  let raw = "";

  res.on("data", (chunk) => (raw += chunk));

  res.on("end", () => {
    const data = JSON.parse(raw);

    if (data.cod !== "200") {
      console.error("Error:", data.message);
      return;
    }

    const seen = {};
    for (const entry of data.list) {
      const date = entry.dt_txt.split(" ")[0];
      if (!seen[date]) seen[date] = entry.main.temp;
      if (Object.keys(seen).length === 5) break;
    }

    console.log("Weather Forecast:");
    for (const [dateStr, temp] of Object.entries(seen)) {
      const date = new Date(dateStr);
      const formatted = date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      console.log(`${formatted}: ${temp.toFixed(2)}°C`);
    }
  });
}).on("error", (e) => {
  console.error("Error fetching weather data:", e.message);
});