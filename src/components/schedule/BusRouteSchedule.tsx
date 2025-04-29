
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, Route, MapPin } from 'lucide-react';
import { busesData, routeData } from '@/data/mockData';

interface BusRouteScheduleProps {
  busId: string;
  onClose: () => void;
}

export const BusRouteSchedule: React.FC<BusRouteScheduleProps> = ({ busId, onClose }) => {
  const bus = busesData.find(b => b.id === busId);
  const route = routeData.find(r => r.id === bus?.route);
  
  if (!bus || !route) {
    return (
      <div className="p-6 text-center">
        <p>Bus or route details not found.</p>
        <Button onClick={onClose} variant="outline" className="mt-4">
          Close
        </Button>
      </div>
    );
  }

  // Generate schedule based on the route stops
  const generateStopSchedule = () => {
    const stops = route.stops;
    const scheduleItems = [];
    
    // Simulated start time
    const currentDate = new Date();
    const baseHour = currentDate.getHours() % 12 || 12; // Convert to 12-hour format
    const baseMinute = Math.floor(currentDate.getMinutes() / 15) * 15;
    let currentTime = new Date();
    currentTime.setHours(baseHour, baseMinute, 0, 0);
    
    // Simulated total trip time divided among stops
    const totalMinutes = route.minTravelTime;
    const averageTimePerStop = Math.floor(totalMinutes / (stops.length - 1));
    
    for (let i = 0; i < stops.length; i++) {
      const stop = stops[i];
      const isFirstStop = i === 0;
      const isLastStop = i === stops.length - 1;
      
      // Add some randomness to stop times (except first and last)
      let minutesToAdd = isFirstStop ? 0 : averageTimePerStop;
      if (!isFirstStop && !isLastStop) {
        // Add some variation to middle stops (-2 to +3 minutes)
        minutesToAdd += Math.floor(Math.random() * 6) - 2;
      }
      
      if (!isFirstStop) {
        currentTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
      }
      
      const formattedTime = currentTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      // Determine if bus is delayed
      const isDelayed = !isFirstStop && Math.random() > 0.8;
      const delayMinutes = isDelayed ? Math.floor(Math.random() * 8) + 3 : 0;
      
      scheduleItems.push({
        stop,
        time: formattedTime,
        isDelayed,
        delayMinutes,
        isFirstStop,
        isLastStop
      });
    }
    
    return scheduleItems;
  };

  const stopSchedule = generateStopSchedule();
  
  // Calculate total trip time based on first and last stop
  const firstStopTime = new Date(`2000/01/01 ${stopSchedule[0].time}`);
  const lastStopRawTime = new Date(`2000/01/01 ${stopSchedule[stopSchedule.length - 1].time}`);
  const lastStopTime = new Date(lastStopRawTime.getTime());
  
  // Handle when the trip goes past midnight
  if (lastStopTime < firstStopTime) {
    lastStopTime.setDate(lastStopTime.getDate() + 1);
  }
  
  // Calculate time difference in minutes
  const totalTripMinutes = Math.round((lastStopTime.getTime() - firstStopTime.getTime()) / 60000);
  const totalTripHours = Math.floor(totalTripMinutes / 60);
  const remainingMinutes = totalTripMinutes % 60;
  const formattedTripTime = totalTripHours > 0 
    ? `${totalTripHours}h ${remainingMinutes}m` 
    : `${totalTripMinutes}m`;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Badge className={`mr-2 ${bus.type === 'ac' ? 'bg-eco-blue-100 text-eco-blue-800' : 'bg-gray-100 text-gray-800'}`}>
            {bus.type === 'ac' ? 'AC' : 'Non-AC'}
          </Badge>
          <h3 className="text-lg font-medium">Route {route.id}: {route.name}</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-muted/30 p-3 rounded-md">
          <div className="text-sm text-muted-foreground">Driver</div>
          <div className="font-medium">{bus.driver}</div>
        </div>
        <div className="bg-muted/30 p-3 rounded-md">
          <div className="text-sm text-muted-foreground">Total Trip Time</div>
          <div className="font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1 text-eco-blue-500" />
            {formattedTripTime}
          </div>
        </div>
        <div className="bg-muted/30 p-3 rounded-md">
          <div className="text-sm text-muted-foreground">Distance</div>
          <div className="font-medium">{route.distance} km</div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
          <Route className="h-4 w-4 mr-1" />
          Stop Schedule
        </h4>
        
        <div className="relative">
          <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-eco-blue-200 z-0"></div>
          <div className="space-y-6 relative z-10">
            {stopSchedule.map((stop, index) => (
              <div key={index} className="flex items-start">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                  stop.isFirstStop 
                    ? 'bg-eco-green-100 text-eco-green-700' 
                    : stop.isLastStop 
                      ? 'bg-eco-orange-100 text-eco-orange-700' 
                      : 'bg-eco-blue-100 text-eco-blue-700'
                }`}>
                  <MapPin className="h-3 w-3" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{stop.stop}</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{stop.time}</span>
                    </div>
                  </div>
                  
                  {stop.isDelayed && (
                    <div className="text-xs text-eco-orange-600 mt-1">
                      Delayed by approximately {stop.delayMinutes} minutes
                    </div>
                  )}
                  
                  {!stop.isLastStop && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {Math.round(route.distance / (route.stops.length - 1) * 10) / 10} km to next stop • 
                      Est. {Math.round(route.minTravelTime / (route.stops.length - 1))} min
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-muted/20 p-4 rounded-md mt-6">
        <h4 className="text-sm font-medium mb-2">Schedule Notes</h4>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Times shown are estimated and may vary based on traffic conditions</li>
          <li>Peak hours may cause additional delays of 5-15 minutes</li>
          <li>Bus {bus.id} operates {route.peakHours.join(', ')}</li>
        </ul>
      </div>
    </div>
  );
};
