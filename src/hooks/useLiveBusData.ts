
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { osmApi, fleetApi } from '../services/apiService';

interface LiveBusData {
  id: string;
  name: string;
  route: string;
  routeName: string;
  driver: string;
  status: 'on-route' | 'charging' | 'maintenance' | 'idle';
  batteryLevel: number;
  estimatedRange: number;
  energyEfficiency: {
    value: number;
    trend: 'up' | 'down' | 'stable';
  };
  type: 'ac' | 'non-ac';
  model: string;
  capacity: number;
  yearManufactured: number;
  currentLocation: {
    lat: number;
    lon: number;
    stopName: string;
    speed: number;
    heading: number;
  };
  passengers: {
    current: number;
    capacity: number;
    averageDaily: number;
  };
  schedule: {
    nextStop: string;
    eta: number;
    departureTime: string;
    completedTrips: number;
    totalTripsToday: number;
  };
}

export const useLiveBusData = (city: string = 'Delhi') => {
  const [liveBusData, setLiveBusData] = useState<LiveBusData[]>([]);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);

  // Delhi bounding box coordinates
  const delhiBbox: [number, number, number, number] = [76.85, 28.40, 77.35, 28.88];

  const { data: stopsData } = useQuery({
    queryKey: ['bus-stops', city],
    queryFn: () => osmApi.getBusStops(city, delhiBbox),
    staleTime: 30 * 60 * 1000,
  });

  const { data: routesData } = useQuery({
    queryKey: ['bus-routes', city],
    queryFn: () => osmApi.getBusRoutes(delhiBbox),
    staleTime: 30 * 60 * 1000,
  });

  // Generate initial bus data when stops and routes are loaded
  useEffect(() => {
    if (stopsData && routesData) {
      const initialBusData = fleetApi.generateLiveBusData(stopsData, routesData);
      setLiveBusData(initialBusData);
    }
  }, [stopsData, routesData]);

  // Simulate live updates every 10 seconds
  useEffect(() => {
    if (liveBusData.length === 0) return;

    setIsLiveUpdating(true);
    const interval = setInterval(() => {
      setLiveBusData(prevData => 
        prevData.map(bus => {
          // Simulate movement and status changes
          const batteryChange = (Math.random() - 0.5) * 2; // -1% to +1%
          const speedChange = (Math.random() - 0.5) * 10; // -5 to +5 km/h
          const passengerChange = Math.floor((Math.random() - 0.5) * 6); // -3 to +3 passengers
          
          return {
            ...bus,
            batteryLevel: Math.max(5, Math.min(100, bus.batteryLevel + batteryChange)),
            estimatedRange: Math.round(Math.max(5, Math.min(100, bus.batteryLevel + batteryChange)) * 2.5),
            currentLocation: {
              ...bus.currentLocation,
              lat: bus.currentLocation.lat + (Math.random() - 0.5) * 0.001, // Small movement
              lon: bus.currentLocation.lon + (Math.random() - 0.5) * 0.001,
              speed: Math.max(0, Math.min(60, bus.currentLocation.speed + speedChange)),
              heading: (bus.currentLocation.heading + (Math.random() - 0.5) * 20) % 360
            },
            passengers: {
              ...bus.passengers,
              current: Math.max(0, Math.min(bus.passengers.capacity, bus.passengers.current + passengerChange))
            },
            schedule: {
              ...bus.schedule,
              eta: Math.max(1, bus.schedule.eta - 1), // Countdown ETA
              completedTrips: bus.schedule.eta <= 1 ? bus.schedule.completedTrips + 1 : bus.schedule.completedTrips
            }
          };
        })
      );
    }, 10000); // Update every 10 seconds

    return () => {
      clearInterval(interval);
      setIsLiveUpdating(false);
    };
  }, [liveBusData.length]);

  // Calculate fleet statistics
  const fleetStats = {
    totalBuses: liveBusData.length,
    activeBuses: liveBusData.filter(bus => bus.status === 'on-route').length,
    chargingBuses: liveBusData.filter(bus => bus.status === 'charging').length,
    maintenanceBuses: liveBusData.filter(bus => bus.status === 'maintenance').length,
    idleBuses: liveBusData.filter(bus => bus.status === 'idle').length,
    averageBatteryLevel: liveBusData.reduce((acc, bus) => acc + bus.batteryLevel, 0) / liveBusData.length || 0,
    averageSpeed: liveBusData.filter(bus => bus.status === 'on-route').reduce((acc, bus) => acc + bus.currentLocation.speed, 0) / liveBusData.filter(bus => bus.status === 'on-route').length || 0,
    totalPassengers: liveBusData.reduce((acc, bus) => acc + bus.passengers.current, 0),
    fleetUtilization: (liveBusData.filter(bus => bus.status === 'on-route').length / liveBusData.length) * 100 || 0
  };

  return {
    liveBusData,
    fleetStats,
    isLiveUpdating,
    busStops: stopsData || [],
    busRoutes: routesData || [],
    isLoading: !stopsData || !routesData
  };
};
