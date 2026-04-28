import { useState } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function getOutfit(weather) {
  if (!weather) return [];
  const w = weather.toLowerCase();

  if (w.includes("rain")) return ["雨衣", "長褲", "防水鞋"];
  if (w.includes("cloud")) return ["薄外套", "長袖"];
  if (w.includes("clear")) return ["T-shirt", "短褲", "太陽眼鏡"];
  return ["舒適穿搭"];
}

function Icon({ type }) {
  if (type?.includes("Rain")) return <CloudRain />;
  if (type?.includes("Cloud")) return <Cloud />;
  return <Sun />;
}

export default function App() {
  const [city, setCity] = useState("Taipei");
  const [weather, setWeather] = useState("");
  const [outfit, setOutfit] = useState([]);

  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    const main = data.weather[0].main;
    setWeather(main);
    setOutfit(getOutfit(main));
  };

  return (
    <div className="container">
      <h1>天氣穿搭 App</h1>

      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={fetchWeather}>查詢</button>

      <div className="card">
        <Icon type={weather} />
        <h2>{weather || "--"}</h2>
      </div>

      <div className="card">
        <h3>穿搭建議</h3>
        <ul>
          {outfit.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
