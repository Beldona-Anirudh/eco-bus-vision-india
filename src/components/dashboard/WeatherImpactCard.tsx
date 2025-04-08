
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun } from 'lucide-react';

interface WeatherImpactCardProps {
  forecastData: {
    day: string;
    weather: 'sunny' | 'rainy' | 'cloudy';
    temperature: number;
    energyImpact: number;
  }[];
}

export const WeatherImpactCard: React.FC<WeatherImpactCardProps> = ({ forecastData }) => {
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'rainy': return <CloudRain className="h-5 w-5 text-eco-blue-500" />;
      case 'sunny': return <Sun className="h-5 w-5 text-eco-orange-500" />;
      default: return <Sun className="h-5 w-5 text-eco-orange-300" />;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 5) return 'text-eco-orange-600';
    if (impact < -5) return 'text-eco-green-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weather Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecastData.map((day) => (
            <div key={day.day} className="flex items-center justify-between pb-3 border-b last:border-b-0 last:pb-0">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(day.weather)}
                <div>
                  <p className="font-medium">{day.day}</p>
                  <p className="text-sm text-muted-foreground">{day.temperature}°C, {day.weather}</p>
                </div>
              </div>
              <div className={`font-medium ${getImpactColor(day.energyImpact)}`}>
                {day.energyImpact > 0 ? '+' : ''}{day.energyImpact}%
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-700">Recommendation</h4>
          <p className="text-sm mt-1 text-gray-600">Adjust battery charge scheduling for upcoming rainy weather to optimize energy usage.</p>
        </div>
      </CardContent>
    </Card>
  );
};
