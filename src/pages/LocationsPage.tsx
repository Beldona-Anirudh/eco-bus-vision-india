
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Route, Bus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { routeDetails } from '../data/mockData';

const LocationsPage = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
        <p className="text-muted-foreground">Track and manage all bus locations and charging stations.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Route className="h-5 w-5" />
              Total Routes
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
            <p className="text-sm text-muted-foreground">Across {routeDetails.length} routes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Avg. Travel Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(routeDetails.reduce((acc, route) => acc + (route.minTravelTime + route.maxTravelTime) / 2, 0) / routeDetails.length)}
              <span className="text-lg font-normal"> min</span>
            </div>
            <p className="text-sm text-muted-foreground">Average across all routes</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Route Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">View detailed information about all bus routes, including stops, distances, and travel times.</p>
          <Button onClick={() => navigate('/route-locations')}>View Route Locations</Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default LocationsPage;
