
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
import { Bus, BarChart, BatteryFull, BatteryCharging } from 'lucide-react';

import { 
  fleetOverviewData, 
  energyMetrics, 
  busesData, 
  batteryStatusData,
  energyUsageData,
  weatherForecastData
} from '../data/mockData';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor and optimize your electric bus fleet in real-time.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Buses" 
          value={fleetOverviewData.totalBuses.toString()}
          icon={<Bus className="h-5 w-5 text-eco-blue-600" />}
          description={`${fleetOverviewData.activeBuses} active`}
        />
        <StatCard 
          title="Energy Consumption" 
          value={`${energyMetrics.totalUsage.toLocaleString()} kWh`}
          icon={<BarChart className="h-5 w-5 text-eco-green-600" />}
          trend={{ value: energyMetrics.predictedSavings, isPositive: false }}
          description="vs. last month"
        />
        <StatCard 
          title="Average Battery Level" 
          value="72%"
          icon={<BatteryFull className="h-5 w-5 text-eco-blue-600" />}
          description="Across all buses"
        />
        <StatCard 
          title="Charging Stations" 
          value="8/12 Available"
          icon={<BatteryCharging className="h-5 w-5 text-eco-green-600" />}
          description="4 stations in use"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <RouteMap />
        <div className="grid grid-cols-1 gap-4">
          <BatteryStatusCard buses={batteryStatusData} />
          <WeatherImpactCard forecastData={weatherForecastData} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <EnergyUsageChart data={energyUsageData} />
        <FleetStatusTable buses={busesData} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight mb-4">Route Planning and Optimization</h2>
        <div className="grid grid-cols-1 gap-4">
          <RoutePlanner />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <RouteOptimizationCard 
          weatherCondition="Rainy"
          weatherImpact="+15% time"
          trafficLevel="Moderate"
          trafficImpact="+10% time"
          timeOfDay="Normal Hours"
          timeImpact="No impact"
          distanceImpact="-5% energy"
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
