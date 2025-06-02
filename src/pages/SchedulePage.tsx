
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BusScheduleTable } from '../components/schedule/BusScheduleTable';
import { BusRouteSchedule } from '../components/schedule/BusRouteSchedule';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Route, AlertTriangle } from "lucide-react";
import { useLiveBusData } from '../hooks/useLiveBusData';

const SchedulePage = () => {
  const { liveBusData, fleetStats, busRoutes } = useLiveBusData();
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  // Calculate schedule statistics
  const scheduleStats = {
    onTimePerformance: 85 + Math.random() * 10, // Mock calculation
    averageDelay: 3 + Math.random() * 5,
    totalTripsToday: liveBusData.reduce((acc, bus) => acc + bus.schedule.completedTrips, 0),
    scheduledTrips: liveBusData.reduce((acc, bus) => acc + bus.schedule.totalTripsToday, 0),
    lateArrivals: Math.floor(liveBusData.length * 0.15),
    earlyArrivals: Math.floor(liveBusData.length * 0.05)
  };

  // Generate time-based schedule data
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      const busesInHour = liveBusData.filter(bus => {
        const departureHour = new Date(bus.schedule.departureTime).getHours();
        return departureHour === hour;
      }).length;
      
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        scheduled: Math.floor(Math.random() * 8) + 2,
        actual: busesInHour,
        efficiency: Math.min(100, (busesInHour / (Math.floor(Math.random() * 8) + 2)) * 100)
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Bus Schedule Management</h1>
        <p className="text-muted-foreground">Monitor bus schedules, routes, and on-time performance</p>
      </div>

      {/* Schedule Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{scheduleStats.onTimePerformance.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">On-Time Performance</div>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{scheduleStats.totalTripsToday}</div>
                <div className="text-sm text-muted-foreground">Completed Trips</div>
              </div>
              <Route className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{scheduleStats.averageDelay.toFixed(1)} min</div>
                <div className="text-sm text-muted-foreground">Average Delay</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{busRoutes.length}</div>
                <div className="text-sm text-muted-foreground">Active Routes</div>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Bus Schedules</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="routes">Route Management</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Live Bus Schedules</CardTitle>
                </CardHeader>
                <CardContent>
                  <BusScheduleTable 
                    buses={liveBusData}
                    onSelectBus={setSelectedBusId}
                    selectedBusId={selectedBusId}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div>
              {selectedBusId ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Route Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BusRouteSchedule 
                      busId={selectedBusId} 
                      onClose={() => setSelectedBusId(null)} 
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Buses</span>
                        <Badge>{liveBusData.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>On Route</span>
                        <Badge variant="default">{fleetStats.activeBuses}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Late Arrivals</span>
                        <Badge variant="destructive">{scheduleStats.lateArrivals}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Early Arrivals</span>
                        <Badge variant="secondary">{scheduleStats.earlyArrivals}</Badge>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground">
                        Click on any bus in the schedule table to view detailed route information and timing.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Schedule Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded border">
                      <span className="font-medium">{slot.time}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">
                          {slot.actual}/{slot.scheduled} buses
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              slot.efficiency >= 90 ? 'bg-green-500' : 
                              slot.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, slot.efficiency)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {slot.efficiency.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {busRoutes.slice(0, 6).map((route, index) => {
                    const routeBuses = liveBusData.filter(bus => bus.route === route.ref);
                    const avgDelay = 2 + Math.random() * 8;
                    const onTimePerf = 75 + Math.random() * 20;
                    
                    return (
                      <div key={route.id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{route.name}</h4>
                            <p className="text-sm text-muted-foreground">{route.from} → {route.to}</p>
                          </div>
                          <Badge style={{ backgroundColor: route.colour, color: 'white' }}>
                            {route.ref}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Buses: </span>
                            <span className="font-medium">{routeBuses.length}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Delay: </span>
                            <span className="font-medium">{avgDelay.toFixed(1)}m</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">On-Time: </span>
                            <span className="font-medium">{onTimePerf.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Route Management</CardTitle>
                <Button>Add New Route</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {busRoutes.map((route) => {
                  const routeBuses = liveBusData.filter(bus => bus.route === route.ref);
                  const activeBuses = routeBuses.filter(bus => bus.status === 'on-route').length;
                  
                  return (
                    <Card key={route.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium">{route.name}</h3>
                            <p className="text-sm text-muted-foreground">{route.operator}</p>
                          </div>
                          <Badge style={{ backgroundColor: route.colour, color: 'white' }}>
                            {route.ref}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Route:</span>
                            <span className="text-sm font-medium">{route.from} → {route.to}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Total Buses:</span>
                            <span className="text-sm font-medium">{routeBuses.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Active:</span>
                            <span className="text-sm font-medium text-green-600">{activeBuses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Wheelchair:</span>
                            <span className="text-sm font-medium">
                              {route.wheelchair ? '✅ Yes' : '❌ No'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit Route
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SchedulePage;
