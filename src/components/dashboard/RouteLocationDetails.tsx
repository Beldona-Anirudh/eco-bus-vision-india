
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Users, Route, MapPin, Navigation } from "lucide-react";
import { busesData } from '../../data/mockData';

interface RouteDetailProps {
  route: {
    id: string;
    name: string;
    startLocation: string;
    endLocation: string;
    distance: number;
    minTravelTime: number;
    maxTravelTime: number;
    stops: string[];
    popularity: number;
    peakHours: string[];
    avgPassengersPerTrip: number;
    busesOnRoute: string[];
  };
}

export const RouteLocationDetails: React.FC<RouteDetailProps> = ({ route }) => {
  // Find buses assigned to this route
  const routeBuses = busesData.filter(bus => route.busesOnRoute.includes(bus.id));
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <Badge className="mb-2">{route.id}</Badge>
            <CardTitle className="text-xl font-bold">{route.name}</CardTitle>
          </div>
          <Badge variant="outline" className="text-lg">{route.distance} km</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Route Information</h3>
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-eco-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Start</div>
                    <div className="text-base">{route.startLocation}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Navigation className="h-5 w-5 text-eco-orange-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">End</div>
                    <div className="text-base">{route.endLocation}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-eco-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Travel Time</div>
                    <div className="text-base">{route.minTravelTime}-{route.maxTravelTime} minutes</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-eco-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Passengers</div>
                    <div className="text-base">{route.avgPassengersPerTrip} per trip</div>
                    <div className="text-xs text-muted-foreground">Route popularity: {route.popularity}%</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-eco-orange-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Peak Hours</div>
                    {route.peakHours.map((hour, i) => (
                      <div key={i} className="text-sm">{hour}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bus Stops</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-eco-blue-200 z-0"></div>
                <div className="space-y-4 relative z-10">
                  {route.stops.map((stop, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${index === 0 ? 'bg-eco-green-100 text-eco-green-700' : index === route.stops.length - 1 ? 'bg-eco-orange-100 text-eco-orange-700' : 'bg-eco-blue-100 text-eco-blue-700'}`}>
                        {index + 1}
                      </div>
                      <div className="bg-card border rounded-lg py-2 px-4 flex-grow">
                        {stop}
                      </div>
                      {index < route.stops.length - 1 && (
                        <div className="text-xs text-muted-foreground ml-2">
                          ~{Math.round(route.distance / (route.stops.length - 1))} km
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Buses on this Route</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Battery</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routeBuses.map(bus => (
                      <TableRow key={bus.id}>
                        <TableCell className="font-medium">{bus.name}</TableCell>
                        <TableCell>{bus.type === 'ac' ? 'AC' : 'Non-AC'}</TableCell>
                        <TableCell>{bus.driver}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-gray-100 rounded-full mr-2">
                              <div 
                                className={`h-full rounded-full ${
                                  bus.batteryLevel < 20 
                                    ? 'bg-eco-orange-500' 
                                    : bus.batteryLevel > 80 
                                      ? 'bg-eco-green-500' 
                                      : 'bg-eco-blue-500'
                                }`}
                                style={{ width: `${bus.batteryLevel}%` }}
                              />
                            </div>
                            <span>{bus.batteryLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              bus.status === 'on-route' ? 'bg-eco-blue-100 text-eco-blue-800 border-eco-blue-200' :
                              bus.status === 'charging' ? 'bg-eco-green-100 text-eco-green-800 border-eco-green-200' :
                              bus.status === 'maintenance' ? 'bg-eco-orange-100 text-eco-orange-800 border-eco-orange-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }
                          >
                            {bus.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
