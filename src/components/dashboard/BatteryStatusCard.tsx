
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BatteryFull, BatteryLow, BatteryCharging, AirVent, ThermometerSnowflake } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface BusData {
  id: string;
  name: string;
  batteryLevel: number;
  status: 'charging' | 'discharging' | 'idle';
  estimatedRange: number;
  type?: 'ac' | 'non-ac';
}

interface BatteryStatusCardProps {
  buses: BusData[];
}

export const BatteryStatusCard: React.FC<BatteryStatusCardProps> = ({ buses }) => {
  const getBatteryIcon = (bus: BusData) => {
    if (bus.status === 'charging') {
      return <BatteryCharging className="h-4 w-4 text-eco-green-500" />;
    } else if (bus.batteryLevel < 20) {
      return <BatteryLow className="h-4 w-4 text-eco-orange-500" />;
    } else {
      return <BatteryFull className="h-4 w-4 text-eco-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'bg-eco-green-100 text-eco-green-800 border-eco-green-200';
      case 'discharging': return 'bg-eco-blue-100 text-eco-blue-800 border-eco-blue-200';
      case 'idle': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Battery Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {buses.map((bus) => (
            <div key={bus.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getBatteryIcon(bus)}
                  <span className="font-medium">{bus.name}</span>
                  {bus.type && (
                    <div className="ml-1">
                      {bus.type === 'ac' ? (
                        <AirVent className="h-3 w-3 text-eco-blue-500" />
                      ) : (
                        <ThermometerSnowflake className="h-3 w-3 text-eco-green-500" />
                      )}
                    </div>
                  )}
                </div>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(bus.status)}
                >
                  {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{bus.batteryLevel}%</span>
                  <span>{bus.estimatedRange} km range</span>
                </div>
                <Progress 
                  value={bus.batteryLevel} 
                  className={
                    bus.batteryLevel < 20 
                      ? 'bg-eco-orange-100' 
                      : bus.status === 'charging' 
                        ? 'bg-eco-green-100' 
                        : 'bg-eco-blue-100'
                  }
                  indicatorClassName={
                    bus.batteryLevel < 20 
                      ? 'bg-eco-orange-500' 
                      : bus.status === 'charging' 
                        ? 'bg-eco-green-500' 
                        : 'bg-eco-blue-500'
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
