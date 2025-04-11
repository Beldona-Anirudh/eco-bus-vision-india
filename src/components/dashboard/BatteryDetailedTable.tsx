
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, AirVent, ThermometerSnowflake, Battery, BatteryCharging, BatteryLow, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface BusPassengerData {
  current: number;
  capacity: number;
  averageDaily: number;
}

interface BusData {
  id: string;
  name: string;
  route: string;
  driver: string;
  status: 'on-route' | 'charging' | 'maintenance' | 'idle';
  batteryLevel: number;
  estimatedRange?: number;
  energyEfficiency: {
    value: number;
    trend: 'up' | 'down' | 'stable';
  };
  type: 'ac' | 'non-ac';
  model: string;
  capacity: number;
  yearManufactured: number;
  passengers: BusPassengerData;
}

interface BatteryDetailedTableProps {
  buses: BusData[];
}

export const BatteryDetailedTable: React.FC<BatteryDetailedTableProps> = ({ buses }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route': return 'bg-eco-blue-100 text-eco-blue-800 border-eco-blue-200';
      case 'charging': return 'bg-eco-green-100 text-eco-green-800 border-eco-green-200';
      case 'maintenance': return 'bg-eco-orange-100 text-eco-orange-800 border-eco-orange-200';
      case 'idle': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBatteryIcon = (batteryLevel: number, status: string) => {
    if (status === 'charging') {
      return <BatteryCharging className="h-4 w-4 text-eco-green-500" />;
    } else if (batteryLevel < 20) {
      return <BatteryLow className="h-4 w-4 text-eco-orange-500" />;
    } else {
      return <Battery className="h-4 w-4 text-eco-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Battery Status & Passenger Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Range</TableHead> 
                <TableHead>Route</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Passengers</TableHead>
                <TableHead>Avg Daily</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => {
                const estimatedRange = bus.estimatedRange || Math.round(bus.batteryLevel * 2.5);
                const passengerPercentage = Math.round((bus.passengers.current / bus.passengers.capacity) * 100);
                
                return (
                  <TableRow key={bus.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{bus.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          {bus.type === 'ac' ? (
                            <>
                              <AirVent className="h-3 w-3" />
                              <span>AC</span>
                            </>
                          ) : (
                            <>
                              <ThermometerSnowflake className="h-3 w-3" />
                              <span>Non-AC</span>
                            </>
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(bus.status)}
                      >
                        {bus.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          {getBatteryIcon(bus.batteryLevel, bus.status)}
                          <span>{bus.batteryLevel}%</span>
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
                        />
                      </div>
                    </TableCell>
                    <TableCell>{estimatedRange} km</TableCell>
                    <TableCell>{bus.route}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{bus.energyEfficiency.value}</span>
                        {bus.energyEfficiency.trend === 'up' && (
                          <ArrowUp className="h-4 w-4 text-eco-orange-500" />
                        )}
                        {bus.energyEfficiency.trend === 'down' && (
                          <ArrowDown className="h-4 w-4 text-eco-green-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-eco-blue-500" />
                          <span>{bus.passengers.current}/{bus.passengers.capacity}</span>
                        </div>
                        <Progress 
                          value={passengerPercentage} 
                          className="bg-eco-blue-100"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{bus.passengers.averageDaily} people</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
