
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

export const RouteMap: React.FC = () => {
  // In a real application, we would integrate with a mapping API like Google Maps or Mapbox
  // For now, we'll create a simple visualization
  
  const busStops = [
    { id: 1, name: 'Dadar', x: 20, y: 60 },
    { id: 2, name: 'Andheri', x: 35, y: 30 },
    { id: 3, name: 'Bandra', x: 60, y: 50 },
    { id: 4, name: 'Worli', x: 75, y: 70 },
    { id: 5, name: 'Churchgate', x: 90, y: 85 },
  ];

  // Active routes connecting the stops
  const routes = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  // Bus locations (simulated)
  const buses = [
    { id: 'BUS001', x: 28, y: 45, route: 'R1', batteryLevel: 65 },
    { id: 'BUS002', x: 68, y: 60, route: 'R2', batteryLevel: 42 },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Live Route Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-gray-100 rounded-md overflow-hidden">
          {/* Map Background - In a real app, this would be an actual map */}
          <div className="absolute inset-0 bg-[url('https://i.imgur.com/6yCiPeH.png')] bg-cover bg-center opacity-30"></div>
          
          {/* Routes */}
          <svg className="absolute inset-0 w-full h-full">
            {routes.map((route) => {
              const start = busStops.find(stop => stop.id === route.from);
              const end = busStops.find(stop => stop.id === route.to);
              if (!start || !end) return null;
              
              return (
                <line 
                  key={`${route.from}-${route.to}`}
                  x1={`${start.x}%`} 
                  y1={`${start.y}%`} 
                  x2={`${end.x}%`} 
                  y2={`${end.y}%`} 
                  stroke="#0ea5e9" 
                  strokeWidth="2"
                  strokeDasharray="4"
                  className="animate-pulse-opacity"
                />
              );
            })}
          </svg>
          
          {/* Bus Stops */}
          {busStops.map((stop) => (
            <div 
              key={stop.id}
              className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            >
              <MapPin className="h-6 w-6 text-eco-blue-700" />
              <span className="text-xs font-medium bg-white rounded-full px-2 py-0.5 shadow-sm mt-1">
                {stop.name}
              </span>
            </div>
          ))}
          
          {/* Buses */}
          {buses.map((bus) => (
            <div 
              key={bus.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float"
              style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-eco-green-600 flex items-center justify-center text-white text-xs font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 5H18a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
                    <path d="M2 10h4"></path>
                    <path d="M2 14h4"></path>
                    <path d="M6 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1Z"></path>
                    <path d="M16 14v2a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-2Z"></path>
                    <path d="M16 8a2 2 0 0 1 2-2h1a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-2"></path>
                    <circle cx="8" cy="14" r="1"></circle>
                    <circle cx="12" cy="14" r="1"></circle>
                  </svg>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-md px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                  {bus.id} • {bus.batteryLevel}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-700">Active Routes</h4>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">12 buses on road</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-700">Avg. Energy Usage</h4>
            <p className="text-2xl font-bold">0.87 kWh/km</p>
            <p className="text-xs text-muted-foreground">-5% from last week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
