
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AirVent, ThermometerSnowflake } from 'lucide-react';

interface BusTypeDistributionProps {
  acBuses: number;
  nonAcBuses: number;
}

export const BusTypeDistribution: React.FC<BusTypeDistributionProps> = ({ acBuses, nonAcBuses }) => {
  const total = acBuses + nonAcBuses;
  const acPercentage = Math.round((acBuses / total) * 100);
  const nonAcPercentage = Math.round((nonAcBuses / total) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Bus Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AirVent className="h-5 w-5 text-eco-blue-600" />
                <span className="font-medium">AC Buses</span>
              </div>
              <span className="text-sm font-medium">{acBuses} buses ({acPercentage}%)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-eco-blue-500 rounded-full" 
                style={{ width: `${acPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ThermometerSnowflake className="h-5 w-5 text-eco-green-600" />
                <span className="font-medium">Non-AC Buses</span>
              </div>
              <span className="text-sm font-medium">{nonAcBuses} buses ({nonAcPercentage}%)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-eco-green-500 rounded-full" 
                style={{ width: `${nonAcPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
