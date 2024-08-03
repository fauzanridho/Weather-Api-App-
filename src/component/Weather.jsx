import axios from "axios";
import { useEffect, useState } from "react";
import cities from "../cities";
import "../index.css";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0].name);
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const apiKey = "d69c9a0820fc4969b2c123031240108";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };
    fetchWeather();
  }, [selectedCity]);

  const handleSelect = (city) => {
    setSelectedCity(city);
    setQuery(city);
    setFilteredCities([]);
  };

  const handleQueryChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length > 0) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  return (
    <div className="bg-blue-400 flex flex-col justify-center items-center text-white h-screen drop-shadow-md ">
      <div className="relative w-full max-w-96 ">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          className="px-2 py-2 text-2xl border-2 text-center border-white rounded-full bg-blue-400 w-full placeholder:text-white/40 focus:outline-none drop-shadow-md"
          placeholder="Enter city name..."
        />
        {filteredCities.length > 0 && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto z-10 drop-shadow-md">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                onClick={() => handleSelect(city.name)}
                className="px-2 py-2 text-black cursor-pointer hover:bg-gray-200 "
              >
                {city.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {weather && (
        <div className="bg-blue-500 text-center rounded-3xl p-7 flex flex-col mt-5 drop-shadow-md relative w-full max-w-96">
          <h1 className="text-3xl">
            Cuaca di {weather.location.name}, {weather.location.country}
          </h1>
          <h2 className="text-8xl my-20">{weather.current.temp_c}°C</h2>
          <p className="text-xl mt-3">{weather.current.condition.text}</p>
          <div className="mt-3 flex justify-center items-center">
            <img
              className="size-28"
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
