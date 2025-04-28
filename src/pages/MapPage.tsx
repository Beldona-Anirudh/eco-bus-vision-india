
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BusLocationMap } from '../components/maps/BusLocationMap';
import { RealtimeAnalytics } from '../components/analytics/RealtimeAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Route, Bus } from "lucide-react";
import { busesData, routeDetails } from '../data/mockData';

const MapPage = () => {
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [isTokenSet, setIsTokenSet] = useState<boolean>(!!localStorage.getItem('mapbox_token'));
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const activeBuses = busesData.filter(bus => bus.status === 'on-route');
  const busCount = activeBuses.length;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Live Bus Tracking</h1>
        <p className="text-muted-foreground">Track bus locations and routes in real-time</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Bus className="h-5 w-5" />
                  Active Buses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{busCount}</div>
                <p className="text-sm text-muted-foreground">Currently on route</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Active Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{routeDetails.length}</div>
                <p className="text-sm text-muted-foreground">Covering {routeDetails.reduce((acc, route) => acc + route.distance, 0).toFixed(1)} km</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Total Stops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {new Set(routeDetails.flatMap(route => route.stops)).size}
                </div>
                <p className="text-sm text-muted-foreground">Across all routes</p>
              </CardContent>
            </Card>
          </div>
          <BusLocationMap mapboxToken={mapboxToken} />
        </>
      )}
    </DashboardLayout>
  );
};

export default MapPage;
