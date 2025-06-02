
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../services/apiService';

interface WeatherData {
  current: {
    city: string;
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
  };
  forecast: Array<{
    date: string;
    temperature: number;
    condition: string;
    energyImpact: number;
  }>;
}

export const useWeatherData = (city: string = 'Delhi') => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const { data: currentWeather } = useQuery({
    queryKey: ['current-weather', city],
    queryFn: () => weatherApi.getCurrentWeather(city),
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });

  const { data: forecastData } = useQuery({
    queryKey: ['weather-forecast', city],
    queryFn: () => weatherApi.getWeatherForecast(city),
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  useEffect(() => {
    if (currentWeather && forecastData) {
      const processedForecast = forecastData.list.slice(0, 5).map((item: any, index: number) => {
        const condition = item.weather[0].main.toLowerCase();
        let energyImpact = 0;
        
        // Calculate energy impact based on weather conditions
        if (condition.includes('rain')) energyImpact = Math.random() * 10 + 5; // 5-15% increase
        else if (condition.includes('snow')) energyImpact = Math.random() * 15 + 10; // 10-25% increase
        else if (condition.includes('clear')) energyImpact = -(Math.random() * 5); // 0-5% decrease
        else energyImpact = Math.random() * 6 - 3; // -3% to +3%

        return {
          date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
          temperature: Math.round(item.main.temp),
          condition: condition.includes('rain') ? 'rainy' : condition.includes('clear') ? 'sunny' : 'cloudy',
          energyImpact: Math.round(energyImpact * 10) / 10
        };
      });

      setWeatherData({
        current: {
          city: currentWeather.name,
          temperature: Math.round(currentWeather.main.temp),
          condition: currentWeather.weather[0].main,
          description: currentWeather.weather[0].description,
          humidity: currentWeather.main.humidity,
          windSpeed: currentWeather.wind?.speed || 0,
          visibility: currentWeather.visibility / 1000 // Convert to km
        },
        forecast: processedForecast
      });
    }
  }, [currentWeather, forecastData]);

  return {
    weatherData,
    isLoading: !currentWeather || !forecastData,
    refetch: () => {
      // Manual refetch functionality can be added here if needed
    }
  };
};
