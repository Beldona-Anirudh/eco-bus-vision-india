
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { RouteMap } from '../components/dashboard/RouteMap';
import { BatteryStatusCard } from '../components/dashboard/BatteryStatusCard';
import { EnergyUsageChart } from '../components/dashboard/EnergyUsageChart';
import { WeatherImpactCard } from '../components/dashboard/WeatherImpactCard';
import { FleetStatusTable } from '../components/dashboard/FleetStatusTable';
import { RoutePlanner } from '../components/dashboard/RoutePlanner';
import { RouteOptimizationCard } from '../components/dashboard/RouteOptimizationCard';
import { ApiStatusCard } from '../components/dashboard/ApiStatusCard';
import { Bus, BarChart, BatteryFull, BatteryCharging, Map, Users, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { useLiveBusData } from '../hooks/useLiveBusData';
import { useWeatherData } from '../hooks/useWeatherData';
import { energyUsageData } from '../data/mockData';

const Index = () => {
  const { liveBusData, fleetStats, busStops, busRoutes, isLiveUpdating } = useLiveBusData();
  const { weatherData } = useWeatherData('Delhi');

  // Calculate additional metrics
  const totalPassengers = fleetStats.totalPassengers;
  const energyEfficiency = liveBusData.reduce((acc, bus) => acc + bus.energyEfficiency.value, 0) / liveBusData.length || 0;
  const routesCovered = new Set(liveBusData.map(bus => bus.route)).size;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Eco Bus Vision India Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and optimize your electric bus fleet with real-time data from multiple APIs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isLiveUpdating ? "default" : "secondary"}>
              {isLiveUpdating ? '🟢 Live' : '🔴 Offline'}
            </Badge>
            {weatherData && (
              <Badge variant="outline">
                {weatherData.current.temperature}°C, {weatherData.current.condition}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Fleet" 
          value={fleetStats.totalBuses.toString()}
          icon={<Bus className="h-5 w-5 text-eco-blue-600" />}
          description={`${fleetStats.activeBuses} active, ${fleetStats.chargingBuses} charging`}
          trend={{ value: Math.round(fleetStats.fleetUtilization), isPositive: true }}
        />
        <StatCard 
          title="Live Passengers" 
          value={totalPassengers.toString()}
          icon={<Users className="h-5 w-5 text-eco-green-600" />}
          description={`Across ${fleetStats.activeBuses} active buses`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Bus Stops (OSM)" 
          value={busStops.length.toString()}
          icon={<BatteryFull className="h-5 w-5 text-eco-blue-600" />}
          description={`Live data from OpenStreetMap`}
        />
        <StatCard 
          title="Energy Efficiency" 
          value={`${energyEfficiency.toFixed(2)} kWh/km`}
          icon={<BatteryCharging className="h-5 w-5 text-eco-green-600" />}
          description={`Fleet average performance`}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Secondary KPI Cards - Only Active Routes and Energy Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard 
          title="Active Routes" 
          value={`${routesCovered}/${busRoutes.length}`}
          icon={<Map className="h-4 w-4 text-purple-600" />}
          description="Live coverage"
        />
        <StatCard 
          title="Avg Energy Usage" 
          value={`${energyEfficiency.toFixed(2)} kWh/km`}
          icon={<BatteryCharging className="h-4 w-4 text-green-600" />}
          description="Fleet efficiency"
        />
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Route Map (static) */}
          <div className="relative">
            <RouteMap />
            <div className="absolute top-4 right-4">
              <Link to="/map">
                <Button size="sm">
                  <Map className="h-4 w-4 mr-1" />
                  Live Map
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Fleet Status */}
          <FleetStatusTable buses={liveBusData.slice(0, 8)} />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <BatteryStatusCard buses={liveBusData.slice(0, 6).map(bus => ({
            id: bus.id,
            name: bus.name,
            batteryLevel: bus.batteryLevel,
            status: bus.status === 'on-route' ? 'discharging' : bus.status,
            estimatedRange: bus.estimatedRange,
            type: bus.type
          }))} />
          
          <WeatherImpactCard />
          
          <ApiStatusCard />
        </div>
      </div>
      
      {/* Energy and Route Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <EnergyUsageChart data={energyUsageData} />
        
        <div className="lg:col-span-2">
          <RoutePlanner />
        </div>
      </div>

      {/* Route Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <RouteOptimizationCard 
          weatherCondition={weatherData ? `${weatherData.current.temperature}°C, ${weatherData.current.condition}` : "Live Weather Data"}
          weatherImpact={weatherData ? "API Connected" : "Demo Mode"}
          trafficLevel="Real-time OSM Data"
          trafficImpact={`${busStops.length} stops mapped`}
          timeOfDay="Live Fleet Tracking"
          timeImpact={`${fleetStats.activeBuses} buses active`}
          distanceImpact={`${energyEfficiency.toFixed(2)} kWh/km avg`}
        />
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/fleet" className="block">
              <div className="p-6 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <Bus className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-medium">Fleet Management</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Manage {fleetStats.totalBuses} buses with live tracking and analytics
                </p>
                <div className="flex gap-2">
                  <Badge variant="default">{fleetStats.activeBuses} Active</Badge>
                  <Badge variant="secondary">{fleetStats.chargingBuses} Charging</Badge>
                </div>
              </div>
            </Link>
            
            <Link to="/schedule" className="block">
              <div className="p-6 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-medium">Schedule Management</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Monitor schedules across {routesCovered} active routes
                </p>
                <div className="flex gap-2">
                  <Badge variant="default">{busRoutes.length} Routes</Badge>
                  <Badge variant="secondary">85% On-Time</Badge>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
