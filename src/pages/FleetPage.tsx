
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DetailedFleetTable } from '../components/dashboard/DetailedFleetTable';
import { BatteryDetailedTable } from '../components/dashboard/BatteryDetailedTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { useLiveBusData } from '../hooks/useLiveBusData';

const FleetPage = () => {
  const { liveBusData, fleetStats, isLiveUpdating } = useLiveBusData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter buses based on search and filters
  const filteredBuses = liveBusData.filter(bus => {
    const matchesSearch = bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bus.status === statusFilter;
    const matchesType = typeFilter === 'all' || bus.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route': return 'bg-green-100 text-green-800';
      case 'charging': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Fleet Management</h1>
            <p className="text-muted-foreground">Monitor and manage your electric bus fleet in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isLiveUpdating ? "default" : "secondary"} className="mr-2">
              {isLiveUpdating ? 'Live Updates' : 'Paused'}
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{fleetStats.totalBuses}</div>
                <div className="text-sm text-muted-foreground">Total Fleet</div>
              </div>
              <div className="text-3xl">🚌</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{fleetStats.activeBuses}</div>
                <div className="text-sm text-muted-foreground">On Route</div>
              </div>
              <Badge className={getStatusColor('on-route')}>Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{fleetStats.chargingBuses}</div>
                <div className="text-sm text-muted-foreground">Charging</div>
              </div>
              <Badge className={getStatusColor('charging')}>Charging</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{fleetStats.maintenanceBuses}</div>
                <div className="text-sm text-muted-foreground">Maintenance</div>
              </div>
              <Badge className={getStatusColor('maintenance')}>Service</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{fleetStats.averageBatteryLevel.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Avg Battery</div>
              </div>
              <div className="text-3xl">🔋</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Fleet Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by bus ID, driver, or route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on-route">On Route</SelectItem>
                <SelectItem value="charging">Charging</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ac">AC Buses</SelectItem>
                <SelectItem value="non-ac">Non-AC Buses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-1" />
              More Filters
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredBuses.length} of {liveBusData.length} buses
          </div>
        </CardContent>
      </Card>

      {/* Fleet Data Tables */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="battery">Battery & Passengers</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DetailedFleetTable buses={filteredBuses} />
        </TabsContent>
        
        <TabsContent value="battery">
          <BatteryDetailedTable buses={filteredBuses} />
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Energy Efficiency</h3>
                  {filteredBuses.slice(0, 5).map(bus => (
                    <div key={bus.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <span className="font-medium">{bus.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{bus.energyEfficiency.value} kWh/km</span>
                        <Badge variant={bus.energyEfficiency.trend === 'down' ? 'default' : 'secondary'}>
                          {bus.energyEfficiency.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Route Performance</h3>
                  {filteredBuses.filter(bus => bus.status === 'on-route').slice(0, 5).map(bus => (
                    <div key={bus.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <span className="font-medium">{bus.name}</span>
                      <div className="text-right">
                        <div>{bus.schedule.completedTrips}/{bus.schedule.totalTripsToday} trips</div>
                        <div className="text-xs text-muted-foreground">{bus.currentLocation.speed} km/h</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Passenger Load</h3>
                  {filteredBuses.filter(bus => bus.passengers.current > 0).slice(0, 5).map(bus => (
                    <div key={bus.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <span className="font-medium">{bus.name}</span>
                      <div className="text-right">
                        <div>{bus.passengers.current}/{bus.passengers.capacity}</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((bus.passengers.current / bus.passengers.capacity) * 100)}% full
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FleetPage;
