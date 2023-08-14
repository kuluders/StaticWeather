import React from "react";
import DayCard from "./DayCard";
import HourlyRow from "./HourlyRow";
import CurrentReport from "./CurrentReport";

const WWO_CODE: Record<string, string> = {
  "113": "Sunny",
  "116": "PartlyCloudy",
  "119": "Cloudy",
  "122": "VeryCloudy",
  "143": "Fog",
  "176": "LightShowers",
  "179": "LightSleetShowers",
  "182": "LightSleet",
  "185": "LightSleet",
  "200": "ThunderyShowers",
  "227": "LightSnow",
  "230": "HeavySnow",
  "248": "Fog",
  "260": "Fog",
  "263": "LightShowers",
  "266": "LightRain",
  "281": "LightSleet",
  "284": "LightSleet",
  "293": "LightRain",
  "296": "LightRain",
  "299": "HeavyShowers",
  "302": "HeavyRain",
  "305": "HeavyShowers",
  "308": "HeavyRain",
  "311": "LightSleet",
  "314": "LightSleet",
  "317": "LightSleet",
  "320": "LightSnow",
  "323": "LightSnowShowers",
  "326": "LightSnowShowers",
  "329": "HeavySnow",
  "332": "HeavySnow",
  "335": "HeavySnowShowers",
  "338": "HeavySnow",
  "350": "LightSleet",
  "353": "LightShowers",
  "356": "HeavyShowers",
  "359": "HeavyRain",
  "362": "LightSleetShowers",
  "365": "LightSleetShowers",
  "368": "LightSnowShowers",
  "371": "HeavySnowShowers",
  "374": "LightSleetShowers",
  "377": "LightSleet",
  "386": "ThunderyShowers",
  "389": "ThunderyHeavyRain",
  "392": "ThunderySnowShowers",
  "395": "HeavySnowShowers",
};

const WEATHER_SYMBOL: Record<string, string> = {
  Unknown: "✨",
  Cloudy: "☁️",
  Fog: "🌫",
  HeavyRain: "🌧",
  HeavyShowers: "🌧",
  HeavySnow: "❄️",
  HeavySnowShowers: "❄️",
  LightRain: "🌦",
  LightShowers: "🌦",
  LightSleet: "🌧",
  LightSleetShowers: "🌧",
  LightSnow: "🌨",
  LightSnowShowers: "🌨",
  PartlyCloudy: "⛅️",
  Sunny: "☀️",
  ThunderyHeavyRain: "🌩",
  ThunderyShowers: "⛈",
  ThunderySnowShowers: "⛈",
  VeryCloudy: "☁️",
};

export default function Weather() {
  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    fetch("https://wttr.in/?format=j1")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  if (data.current_condition) {
    const currentCondition = {
      localObsDateTime: data.current_condition[0].observation_time,
      humidity: data.current_condition[0].humidity,
      tempC: data.current_condition[0].tempC,
      weatherDesc: data.current_condition[0].weatherDesc[0].value,
      windspeedKmph: data.current_condition[0].windspeedKmph,
      precipMM: data.current_condition[0].precipMM,
      weatherCode: data.current_condition[0].weatherCode,
      weatherIcon: WEATHER_SYMBOL[
        WWO_CODE[data.current_condition[0].weatherCode]
      ]
        ? WEATHER_SYMBOL[WWO_CODE[data.current_condition[0].weatherCode]]
        : WEATHER_SYMBOL["Unknown"],
    };
    const city = data.nearest_area[0].areaName[0].value;
    const country = data.nearest_area[0].country[0].value;
    const weather = data.weather;
    const cards = weather.map((item: any, index: number) => {
      return (
        <DayCard
          key={index}
          date={item.date}
          weatherIcon={WEATHER_SYMBOL[WWO_CODE[item.hourly[4].weatherCode]]}
          weatherDesc={item.hourly[4].weatherDesc[0].value}
          maxTempC={item.maxtempC}
          minTempC={item.mintempC}
          UVIndex={item.uvIndex}
        />
      );
    });
    const observationTime = currentCondition.localObsDateTime;
    const hourlyList = weather.map((item: any, index: number) => {
      if (item.date == weather[0].date) {
        return item.hourly.map((hItem: any, hIndex: number) => {
          return (
            <HourlyRow
              key={hIndex}
              icon={WEATHER_SYMBOL[WWO_CODE[hItem.weatherCode]]}
              hourly={hItem}
              localObsDateTime={observationTime}
            />
          );
        });
      }
    });
    return (
      <div>
        <CurrentReport
          currentData={currentCondition}
          city={city}
          country={country}
        />
        <div className="row mt-4 m-2 mb-4">{cards}</div>
        <p className="ms-3">Forecast for the upcoming hours:</p>
        {hourlyList}
      </div>
    );
  } else {
    return (
      <div className="text-center">
        No data fetched sorry, most likely wttr.in is experiencing too high load
        to fetch at this time.
      </div>
    );
  }
}
