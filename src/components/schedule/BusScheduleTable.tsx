
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import { routeData } from '@/data/mockData';

interface BusData {
  id: string;
  name: string;
  route: string;
  driver: string;
  status: 'on-route' | 'charging' | 'maintenance' | 'idle';
  batteryLevel: number;
  type: 'ac' | 'non-ac';
  model: string;
  capacity: number;
  yearManufactured: number;
}

interface BusScheduleTableProps {
  buses: BusData[];
  onSelectBus: (busId: string) => void;
  selectedBusId: string | null;
}

export const BusScheduleTable: React.FC<BusScheduleTableProps> = ({ 
  buses, 
  onSelectBus,
  selectedBusId 
}) => {
  // Calculate start and end times for each bus
  const getScheduleTimes = (busId: string) => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const baseStartHour = (hour + Math.floor(Math.random() * 2)) % 24;
    const baseEndHour = (baseStartHour + 7 + Math.floor(Math.random() * 3)) % 24;
    
    const formatTime = (hour: number, minutes: number) => {
      return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
    
    const startTimeMinutes = Math.floor(Math.random() * 60);
    const endTimeMinutes = Math.floor(Math.random() * 60);
    
    const startTime = formatTime(baseStartHour, startTimeMinutes);
    const endTime = formatTime(baseEndHour, endTimeMinutes);
    
    return { startTime, endTime };
  };
  
  // Generate route completion time
  const getRouteCompletionTime = (busId: string, routeId: string) => {
    const route = routeData.find(r => r.id === routeId);
    
    if (!route) {
      return { time: '45-60', stops: 10 };
    }
    
    const baseTime = route.minTravelTime;
    const maxTime = route.maxTravelTime;
    
    return {
      time: `${baseTime}-${maxTime}`,
      stops: route.stops.length
    };
  };

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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bus ID</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Schedule Time</TableHead>
            <TableHead>Route Time</TableHead>
            <TableHead>Stops</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buses.map((bus) => {
            const { startTime, endTime } = getScheduleTimes(bus.id);
            const route = routeData.find(r => r.id === bus.route) || { id: "unknown", name: "Unknown" };
            const routeInfo = getRouteCompletionTime(bus.id, bus.route);
            
            return (
              <TableRow key={bus.id} className={selectedBusId === bus.id ? "bg-muted" : undefined}>
                <TableCell className="font-medium">{bus.name}</TableCell>
                <TableCell>{route.name}</TableCell>
                <TableCell>{bus.driver}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(bus.status)}
                  >
                    {bus.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{startTime} - {endTime}</TableCell>
                <TableCell>{routeInfo.time} min</TableCell>
                <TableCell>{routeInfo.stops}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onSelectBus(bus.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
