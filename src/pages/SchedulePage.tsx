
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BusScheduleTable } from '../components/schedule/BusScheduleTable';
import { BusRouteSchedule } from '../components/schedule/BusRouteSchedule';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Bus } from 'lucide-react';
import { busesData, routeDetails } from '../data/mockData';

const SchedulePage = () => {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuses = busesData.filter(bus => 
    bus.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">View and manage bus schedules and route timings.</p>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search buses or routes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Calendar className="h-4 w-4 mr-1" />
          Today
        </Button>
      </div>

      <Tabs defaultValue="allBuses" className="mb-6">
        <TabsList>
          <TabsTrigger value="allBuses" className="flex items-center">
            <Bus className="h-4 w-4 mr-2" /> 
            All Buses
          </TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
        </TabsList>
        <TabsContent value="allBuses" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Bus Fleet Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <BusScheduleTable 
                buses={filteredBuses}
                onSelectBus={setSelectedBus}
                selectedBusId={selectedBus}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="routes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Schedules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Select a route to view its detailed schedule
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drivers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Schedules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Driver scheduling and shift information
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedBus && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Bus Schedule Detail: {busesData.find(b => b.id === selectedBus)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BusRouteSchedule 
              busId={selectedBus} 
              onClose={() => setSelectedBus(null)} 
            />
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default SchedulePage;
