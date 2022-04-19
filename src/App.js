import React, { useState, useEffect } from "react";
import axios from 'axios'

import './index.css';


function App() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])
  if (location === false) {
    return (
      <div className="ErrorMensage">
        Você precisa dar permissão para acessar sua localização
      </div>
    )
  } else {
    return (
      <div className="Exhibition">
        <h1>Clima em {weather['name']}: {weather['weather'][0]['description']}</h1>
        <hr />
        <div className="informations">

          <spam>Temperatura Atual: {weather['main']['temp']}°</spam>
          <spam>Sensação Termica: {weather['main']['feels_like']}°</spam>
          <spam>Temperatura Maxima: {weather['main']['temp_max']}°</spam>
          <spam>Temperatura Minima: {weather['main']['temp_min']}°</spam>
          <spam>Umidade relativa: {weather['main']['humidity']}%</spam>
          <spam>Vento: {weather['wind']['speed']}km/h</spam>
          <spam>Rajadas: {weather['wind']['gust']}km/h</spam>

        </div>


      </div>
    );

  }
}

export default App;
