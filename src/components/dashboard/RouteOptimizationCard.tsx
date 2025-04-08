
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route, CloudRain, Clock, CircleAlert } from 'lucide-react';

interface RouteFactorProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  impact: string;
  trend?: 'up' | 'down' | 'neutral';
}

const RouteFactor: React.FC<RouteFactorProps> = ({ icon, label, value, impact, trend }) => {
  const getTrendColor = () => {
    if (!trend) return "text-gray-600";
    return trend === 'up' ? "text-red-600" : trend === 'down' ? "text-green-600" : "text-gray-600";
  };

  const getTrendArrow = () => {
    if (!trend) return null;
    return trend === 'up' ? "↑" : trend === 'down' ? "↓" : "→";
  };

  return (
    <div className="flex items-center p-3 border-b last:border-0">
      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted mr-3">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium">{label}</h3>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
      <div className={`text-sm font-medium ${getTrendColor()}`}>
        {impact} {getTrendArrow()}
      </div>
    </div>
  );
};

interface RouteOptimizationCardProps {
  weatherCondition: string;
  weatherImpact: string;
  trafficLevel: string;
  trafficImpact: string;
  timeOfDay: string;
  timeImpact: string;
  distanceImpact: string;
}

export const RouteOptimizationCard: React.FC<RouteOptimizationCardProps> = ({
  weatherCondition,
  weatherImpact,
  trafficLevel,
  trafficImpact,
  timeOfDay,
  timeImpact,
  distanceImpact
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Route Optimization Factors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          <RouteFactor 
            icon={<CloudRain className="h-5 w-5 text-blue-500" />}
            label="Weather Conditions"
            value={weatherCondition}
            impact={weatherImpact}
            trend="up"
          />
          <RouteFactor 
            icon={<CircleAlert className="h-5 w-5 text-orange-500" />}
            label="Traffic Level"
            value={trafficLevel}
            impact={trafficImpact}
            trend="up"
          />
          <RouteFactor 
            icon={<Clock className="h-5 w-5 text-purple-500" />}
            label="Time of Day"
            value={timeOfDay}
            impact={timeImpact}
            trend="neutral"
          />
          <RouteFactor 
            icon={<Route className="h-5 w-5 text-green-500" />}
            label="Distance Factor"
            value="Based on route length"
            impact={distanceImpact}
            trend="down"
          />
        </div>
        
        <div className="mt-4 bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-700">Today's Optimization Tips</h4>
          <p className="text-sm mt-1 text-gray-600">Recommending AC buses for routes with less traffic and non-AC buses for shorter routes during off-peak hours.</p>
        </div>
      </CardContent>
    </Card>
  );
};
