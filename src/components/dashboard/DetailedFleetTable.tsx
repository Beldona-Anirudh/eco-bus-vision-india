
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, AirVent, ThermometerSnowflake } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BusData {
  id: string;
  name: string;
  route: string;
  driver: string;
  status: 'on-route' | 'charging' | 'maintenance' | 'idle';
  batteryLevel: number;
  energyEfficiency: {
    value: number;
    trend: 'up' | 'down' | 'stable';
  };
  type: 'ac' | 'non-ac';
  model: string;
  capacity: number;
  yearManufactured: number;
}

interface DetailedFleetTableProps {
  buses: BusData[];
}

export const DetailedFleetTable: React.FC<DetailedFleetTableProps> = ({ buses }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route': return 'bg-eco-blue-100 text-eco-blue-800 border-eco-blue-200';
      case 'charging': return 'bg-eco-green-100 text-eco-green-800 border-eco-green-200';
      case 'maintenance': return 'bg-eco-orange-100 text-eco-orange-800 border-eco-orange-200';
      case 'idle': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Fleet Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {bus.type === 'ac' ? (
                        <>
                          <AirVent className="h-4 w-4 text-eco-blue-600" />
                          <span>AC</span>
                        </>
                      ) : (
                        <>
                          <ThermometerSnowflake className="h-4 w-4 text-eco-green-600" />
                          <span>Non-AC</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{bus.model}</TableCell>
                  <TableCell>{bus.route}</TableCell>
                  <TableCell>{bus.driver}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(bus.status)}
                    >
                      {bus.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-100 rounded-full mr-2">
                        <div 
                          className={`h-full rounded-full ${
                            bus.batteryLevel < 20 
                              ? 'bg-eco-orange-500' 
                              : bus.batteryLevel > 80 
                                ? 'bg-eco-green-500' 
                                : 'bg-eco-blue-500'
                          }`}
                          style={{ width: `${bus.batteryLevel}%` }}
                        />
                      </div>
                      <span>{bus.batteryLevel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{bus.capacity} seats</TableCell>
                  <TableCell>{bus.yearManufactured}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
