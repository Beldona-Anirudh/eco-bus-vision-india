
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Route, CloudRain } from "lucide-react";
import { busesData } from "../../data/mockData";

// Weather impact on routes
const weatherImpact = {
  sunny: { label: "Sunny", impact: 0, icon: "☀️" },
  cloudy: { label: "Cloudy", impact: 5, icon: "☁️" },
  rainy: { label: "Rainy", impact: 15, icon: "🌧️" },
  snowy: { label: "Snowy", impact: 25, icon: "❄️" },
};

// Traffic condition impact
const trafficImpact = {
  light: { label: "Light", impact: 0, icon: "🟢" },
  moderate: { label: "Moderate", impact: 10, icon: "🟡" },
  heavy: { label: "Heavy", impact: 25, icon: "🔴" },
};

// Rush hour impact
const timeImpact = {
  normal: { label: "Normal Hours", impact: 0, icon: "⏰" },
  rush: { label: "Rush Hours", impact: 20, icon: "⚡" },
};

export const RoutePlanner: React.FC = () => {
  const [selectedBus, setSelectedBus] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [weather, setWeather] = useState<keyof typeof weatherImpact>("sunny");
  const [traffic, setTraffic] = useState<keyof typeof trafficImpact>("light");
  const [time, setTime] = useState<keyof typeof timeImpact>("normal");
  const [routeResults, setRouteResults] = useState<Array<{
    busId: string;
    estimatedTime: number;
    energyUsage: number;
    optimizationScore: number;
  }>>([]);

  // Calculate route metrics
  const calculateRoute = () => {
    if (!selectedBus && !startLocation && !endLocation && distance <= 0) {
      // If calculating for all buses without specific route details,
      // show optimization for all buses based on current conditions
      const results = busesData.map(bus => {
        // Base time - 2 minutes per km
        const baseTime = distance > 0 ? distance * 2 : Math.floor(Math.random() * 40) + 10;
        
        // Apply impact factors
        const weatherFactor = 1 + (weatherImpact[weather].impact / 100);
        const trafficFactor = 1 + (trafficImpact[traffic].impact / 100);
        const timeFactor = 1 + (timeImpact[time].impact / 100);
        
        // Calculate estimated time with factors
        const estimatedTime = Math.round(baseTime * weatherFactor * trafficFactor * timeFactor);
        
        // Energy usage calculation (kWh)
        // AC buses consume more energy
        const baseEnergyPerKm = bus.type === 'ac' ? 1.2 : 0.9;
        const energyUsage = Math.round((distance > 0 ? distance : 20) * baseEnergyPerKm * 10) / 10;
        
        // Optimization score (lower is better, scale 1-100)
        const optimizationScore = Math.max(1, Math.min(100, Math.round(
          100 - (estimatedTime / baseTime) * 50
        )));
        
        return {
          busId: bus.id,
          estimatedTime,
          energyUsage,
          optimizationScore
        };
      });
      
      setRouteResults(results);
    } else if (selectedBus && startLocation && endLocation && distance > 0) {
      // Single bus calculation with specific route
      const bus = busesData.find(b => b.id === selectedBus);
      
      if (bus) {
        // Base time - 2 minutes per km
        const baseTime = distance * 2;
        
        // Apply impact factors
        const weatherFactor = 1 + (weatherImpact[weather].impact / 100);
        const trafficFactor = 1 + (trafficImpact[traffic].impact / 100);
        const timeFactor = 1 + (timeImpact[time].impact / 100);
        
        // Calculate estimated time with factors
        const estimatedTime = Math.round(baseTime * weatherFactor * trafficFactor * timeFactor);
        
        // Energy usage calculation (kWh)
        const baseEnergyPerKm = bus.type === 'ac' ? 1.2 : 0.9;
        const energyUsage = Math.round(distance * baseEnergyPerKm * 10) / 10;
        
        // Optimization score (lower is better, scale 1-100)
        const optimizationScore = Math.max(1, Math.min(100, Math.round(
          100 - (estimatedTime / baseTime) * 50
        )));
        
        setRouteResults([{
          busId: bus.id,
          estimatedTime,
          energyUsage,
          optimizationScore
        }]);
      }
    }
  };

  // Function to visualize the optimization score
  const getOptimizationColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Route Planning Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bus">Bus (Optional)</Label>
                <Select value={selectedBus} onValueChange={setSelectedBus}>
                  <SelectTrigger id="bus">
                    <SelectValue placeholder="Select a bus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-buses">All Buses</SelectItem>
                    {busesData.map(bus => (
                      <SelectItem key={bus.id} value={bus.id}>
                        {bus.name} ({bus.type === 'ac' ? 'AC' : 'Non-AC'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="start">Start Location</Label>
                <Input id="start" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} placeholder="Enter start location" />
              </div>
              
              <div>
                <Label htmlFor="end">End Location</Label>
                <Input id="end" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} placeholder="Enter end location" />
              </div>
              
              <div>
                <Label htmlFor="distance">Distance (km)</Label>
                <Input 
                  id="distance" 
                  type="number" 
                  min="0"
                  value={distance || ''} 
                  onChange={(e) => setDistance(Number(e.target.value))} 
                  placeholder="Enter distance in kilometers" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="weather">Weather Conditions</Label>
                <Select value={weather} onValueChange={(value: keyof typeof weatherImpact) => setWeather(value)}>
                  <SelectTrigger id="weather" className="flex items-center">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(weatherImpact).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        {icon} {label} {key !== 'sunny' && `(+${weatherImpact[key as keyof typeof weatherImpact].impact}%)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="traffic">Traffic Conditions</Label>
                <Select value={traffic} onValueChange={(value: keyof typeof trafficImpact) => setTraffic(value)}>
                  <SelectTrigger id="traffic" className="flex items-center">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(trafficImpact).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        {icon} {label} {key !== 'light' && `(+${trafficImpact[key as keyof typeof trafficImpact].impact}%)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="time">Time of Day</Label>
                <Select value={time} onValueChange={(value: keyof typeof timeImpact) => setTime(value)}>
                  <SelectTrigger id="time" className="flex items-center">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(timeImpact).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        {icon} {label} {key !== 'normal' && `(+${timeImpact[key as keyof typeof timeImpact].impact}%)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={calculateRoute} className="w-full mt-6">
                Calculate Route
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {routeResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Route Optimization Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus ID</TableHead>
                    <TableHead>Estimated Time</TableHead>
                    <TableHead>Energy Usage</TableHead>
                    <TableHead>Optimization Score</TableHead>
                    <TableHead>Factors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routeResults.map((result) => (
                    <TableRow key={result.busId}>
                      <TableCell className="font-medium">
                        {result.busId}
                      </TableCell>
                      <TableCell>
                        {result.estimatedTime} min
                      </TableCell>
                      <TableCell>
                        {result.energyUsage} kWh
                      </TableCell>
                      <TableCell className={getOptimizationColor(result.optimizationScore)}>
                        {result.optimizationScore}/100
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <span title="Weather">{weatherImpact[weather].icon}</span>
                          <span title="Traffic">{trafficImpact[traffic].icon}</span>
                          <span title="Time of day">{timeImpact[time].icon}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-700">Recommendation</h4>
              <p className="text-sm mt-1 text-gray-600">
                {routeResults.length > 1 
                  ? `Optimal bus for this route: ${routeResults.sort((a, b) => b.optimizationScore - a.optimizationScore)[0].busId}`
                  : `Route optimized for bus ${routeResults[0].busId} with a score of ${routeResults[0].optimizationScore}/100`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
