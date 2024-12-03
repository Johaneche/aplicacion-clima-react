import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '981611edb974dbd357be0ecfceb3cf6b'
    const difKelvin = 273.15 //Para obterner grados Celsiuos debemos restar este numero a los grados Kelvin
    
    const fetchWeatherData = async() => {
        try{
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            setWeatherData(data)
            console.log(data)
        } catch (error){
            console.error('Ha habido un error: ', error);
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(city)
        fetchWeatherData()
    }

    const handlCityChange = (event) => {
        setCity(event.target.value)
    }


    return (
        <div className="container">
            <h1>Aplicacion de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Ingresa una ciudad"
                value={city}
                onChange={handlCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
                    <p>La condición metereológica actual es: {weatherData.weather[0].description}</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description} 
                    />

                </div>
            )}



        </div>
        
    )
}
