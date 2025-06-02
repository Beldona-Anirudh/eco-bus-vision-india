
import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LiveBusMap } from '../components/maps/LiveBusMap';
import { RealtimeAnalytics } from '../components/analytics/RealtimeAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Route, Bus, Battery, Users, Clock } from "lucide-react";
import { useLiveBusData } from '../hooks/useLiveBusData';

const MapPage = () => {
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [isTokenSet, setIsTokenSet] = useState<boolean>(!!localStorage.getItem('mapbox_token'));
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { fleetStats, busStops, busRoutes } = useLiveBusData();

  const handleSaveToken = () => {
    const token = tokenInputRef.current?.value.trim();
    if (!token) {
      toast({
        title: "Token Required",
        description: "Please enter a valid Mapbox token",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('mapbox_token', token);
    setMapboxToken(token);
    setIsTokenSet(true);
    toast({
      title: "Token Saved",
      description: "Your Mapbox token has been saved",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Live Bus Tracking & Analytics</h1>
        <p className="text-muted-foreground">Monitor bus locations, routes, and fleet performance in real-time</p>
      </div>

      {!isTokenSet ? (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Mapbox API Key Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">To view the live map and analytics, you need to provide a valid Mapbox API key (public token).</p>
            <p className="mb-4 text-sm text-muted-foreground">
              You can get a free Mapbox token by signing up at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input ref={tokenInputRef} type="text" placeholder="Enter your Mapbox token" className="flex-1" />
              <Button onClick={handleSaveToken}>Save Token</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <RealtimeAnalytics />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bus className="h-4 w-4 text-green-600" />
                  Active Buses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{fleetStats.activeBuses}</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Battery className="h-4 w-4 text-blue-600" />
                  Avg Battery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{fleetStats.averageBatteryLevel.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Fleet average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Route className="h-4 w-4 text-purple-600" />
                  Active Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{busRoutes.length}</div>
                <p className="text-xs text-muted-foreground">Live routes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  Bus Stops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{busStops.length}</div>
                <p className="text-xs text-muted-foreground">Total stops</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  Passengers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600">{fleetStats.totalPassengers}</div>
                <p className="text-xs text-muted-foreground">Current load</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{fleetStats.fleetUtilization.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Fleet efficiency</p>
              </CardContent>
            </Card>
          </div>

          <LiveBusMap mapboxToken={mapboxToken} height="700px" />
        </>
      )}
    </DashboardLayout>
  );
};

export default MapPage;
