
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Cloud } from 'lucide-react';
import { useWeatherData } from '@/hooks/useWeatherData';

export const WeatherImpactCard: React.FC = () => {
  const { weatherData, isLoading } = useWeatherData('Delhi');

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'rainy': return <CloudRain className="h-5 w-5 text-eco-blue-500" />;
      case 'sunny': return <Sun className="h-5 w-5 text-eco-orange-500" />;
      default: return <Cloud className="h-5 w-5 text-eco-orange-300" />;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 5) return 'text-eco-orange-600';
    if (impact < -5) return 'text-eco-green-600';
    return 'text-gray-600';
  };

  if (isLoading || !weatherData) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Weather Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="w-8 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weather Impact - {weatherData.current.city}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Current Weather</h4>
              <p className="text-sm text-muted-foreground">
                {weatherData.current.temperature}°C, {weatherData.current.description}
              </p>
            </div>
            {getWeatherIcon(weatherData.current.condition.toLowerCase())}
          </div>
        </div>

        <div className="space-y-4">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between pb-3 border-b last:border-b-0 last:pb-0">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(day.condition)}
                <div>
                  <p className="font-medium">{day.date}</p>
                  <p className="text-sm text-muted-foreground">{day.temperature}°C, {day.condition}</p>
                </div>
              </div>
              <div className={`font-medium ${getImpactColor(day.energyImpact)}`}>
                {day.energyImpact > 0 ? '+' : ''}{day.energyImpact}%
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-700">Live Recommendation</h4>
          <p className="text-sm mt-1 text-gray-600">
            {weatherData.current.condition.toLowerCase().includes('rain') 
              ? 'Rainy conditions detected. Consider adjusting charging schedules and route timings.'
              : weatherData.current.condition.toLowerCase().includes('clear')
              ? 'Clear weather conditions. Optimal time for standard operations.'
              : 'Monitor weather conditions and adjust operations as needed.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
