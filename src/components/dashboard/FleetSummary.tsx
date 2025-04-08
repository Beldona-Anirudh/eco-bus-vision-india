
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, AirVent, ThermometerSnowflake, Battery, Wrench } from 'lucide-react';

interface FleetSummaryProps {
  totalBuses: number;
  activeBuses: number;
  chargingBuses: number;
  maintenanceBuses: number;
  acBuses: number;
  nonAcBuses: number;
}

export const FleetSummary: React.FC<FleetSummaryProps> = ({ 
  totalBuses, 
  activeBuses, 
  chargingBuses, 
  maintenanceBuses,
  acBuses,
  nonAcBuses
}) => {
  const idleBuses = totalBuses - activeBuses - chargingBuses - maintenanceBuses;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Fleet Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Bus className="h-5 w-5 text-eco-blue-600" />
              <h4 className="text-sm font-medium text-gray-700">Total Buses</h4>
            </div>
            <p className="text-2xl font-bold mt-1">{totalBuses}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <AirVent className="h-5 w-5 text-eco-blue-600" />
              <h4 className="text-sm font-medium text-gray-700">AC Buses</h4>
            </div>
            <p className="text-2xl font-bold mt-1">{acBuses}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <ThermometerSnowflake className="h-5 w-5 text-eco-green-600" />
              <h4 className="text-sm font-medium text-gray-700">Non-AC Buses</h4>
            </div>
            <p className="text-2xl font-bold mt-1">{nonAcBuses}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Bus className="h-5 w-5 text-eco-green-600" />
              <h4 className="text-sm font-medium text-gray-700">Active Buses</h4>
            </div>
            <p className="text-2xl font-bold mt-1">{activeBuses}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5 text-eco-blue-600" />
              <h4 className="text-sm font-medium text-gray-700">Charging</h4>
            </div>
            <p className="text-2xl font-bold mt-1">{chargingBuses}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-eco-orange-600" />
              <h4 className="text-sm font-medium text-gray-700">Maintenance</h4>
            </div>
            <p className="text-2xl font-bold mt-1">{maintenanceBuses}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
