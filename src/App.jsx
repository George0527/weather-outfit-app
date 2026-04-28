import { useState } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// 台灣縣市（中文 → 英文對應）
const cities = [
  { zh: "台北市", en: "Taipei" },
  { zh: "新北市", en: "New Taipei" },
  { zh: "桃園市", en: "Taoyuan" },
  { zh: "台中市", en: "Taichung" },
  { zh: "台南市", en: "Tainan" },
  { zh: "高雄市", en: "Kaohsiung" },
  { zh: "基隆市", en: "Keelung" },
  { zh: "新竹市", en: "Hsinchu" },
  { zh: "新竹縣", en: "Hsinchu County" },
  { zh: "苗栗縣", en: "Miaoli" },
  { zh: "彰化縣", en: "Changhua" },
  { zh: "南投縣", en: "Nantou" },
  { zh: "雲林縣", en: "Yunlin" },
  { zh: "嘉義市", en: "Chiayi" },
  { zh: "嘉義縣", en: "Chiayi County" },
  { zh: "屏東縣", en: "Pingtung" },
  { zh: "宜蘭縣", en: "Yilan" },
  { zh: "花蓮縣", en: "Hualien" },
  { zh: "台東縣", en: "Taitung" },
  { zh: "澎湖縣", en: "Penghu" },
  { zh: "金門縣", en: "Kinmen" },
  { zh: "連江縣", en: "Matsu" }
];

function Icon({ type }) {
  if (type?.includes("Rain")) return <CloudRain />;
  if (type?.includes("Cloud")) return <Cloud />;
  return <Sun />;
}

export default function App() {
  const [city, setCity] = useState("Taipei");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");

  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    setWeather(data.weather[0].main);
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
  };

  return (
    <div className="container">
      <h1>天氣穿搭 App</h1>

      {/* 下拉選單 */}
      <select onChange={(e) => setCity(e.target.value)}>
        {cities.map((c, i) => (
          <option key={i} value={c.en}>
            {c.zh}
          </option>
        ))}
      </select>

      <button onClick={fetchWeather}>查詢</button>

      {/* 天氣卡片 */}
      <div className="card">
        <Icon type={weather} />
        <h2>{weather || "--"}</h2>
        <p>🌡 溫度：{temp ? `${temp}°C` : "--"}</p>
        <p>💧 濕度：{humidity ? `${humidity}%` : "--"}</p>
      </div>
    </div>
  );
}