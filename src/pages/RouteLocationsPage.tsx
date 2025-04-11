
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { RouteLocationDetails } from '../components/dashboard/RouteLocationDetails';
import { RouteMap } from '../components/dashboard/RouteMap';
import { routeDetails, busesData } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RouteLocationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter routes based on search query
  const filteredRoutes = routeDetails.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.stops.some(stop => stop.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Route Locations</h1>
        <p className="text-muted-foreground">View detailed information about bus routes, locations, and travel times.</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Route Map Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[400px]">
            <RouteMap />
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search routes, locations, or stops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {routeDetails.map(route => (
          <Badge 
            key={route.id}
            variant="outline" 
            className="cursor-pointer hover:bg-accent"
            onClick={() => setSearchQuery(route.id)}
          >
            {route.id}
          </Badge>
        ))}
      </div>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoutes.map(route => (
              <Card key={route.id} className="overflow-hidden">
                <CardHeader className="pb-2 bg-muted/40">
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>{route.id}</span>
                    <Badge>{route.distance} km</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{route.name}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">From:</span>
                      <span>{route.startLocation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">To:</span>
                      <span>{route.endLocation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Travel Time:</span>
                      <span>{route.minTravelTime}-{route.maxTravelTime} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Buses:</span>
                      <span>{route.busesOnRoute.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Avg. Passengers:</span>
                      <span>{route.avgPassengersPerTrip}/trip</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="details">
          {filteredRoutes.map(route => (
            <RouteLocationDetails key={route.id} route={route} />
          ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RouteLocationsPage;
