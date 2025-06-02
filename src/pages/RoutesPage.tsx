
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { RouteMap } from '../components/dashboard/RouteMap';
import { RouteOptimizationCard } from '../components/dashboard/RouteOptimizationCard';
import { RoutePlanner } from '../components/dashboard/RoutePlanner';
import { WeatherImpactCard } from '../components/dashboard/WeatherImpactCard';
import { routeData } from '../data/mockData';

const RoutesPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Route Planner</h1>
        <p className="text-muted-foreground">Plan and optimize your bus routes for efficiency.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <RouteOptimizationCard 
          weatherCondition="Rainy (Today)"
          weatherImpact="+15%"
          trafficLevel="Moderate to Heavy"
          trafficImpact="+10-25%"
          timeOfDay="Morning Rush Hour"
          timeImpact="+20%"
          distanceImpact="-5%"
        />
        <WeatherImpactCard />
      </div>

      <div className="mb-6">
        <RouteMap />
      </div>
      
      <div className="mb-6">
        <RoutePlanner />
      </div>
    </DashboardLayout>
  );
};

export default RoutesPage;
