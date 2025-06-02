
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { osmApi } from '../services/apiService';

interface BusStop {
  id: number;
  name: string;
  lat: number;
  lon: number;
  type: string;
}

interface BusRoute {
  id: number;
  name: string;
  operator: string;
  from: string;
  to: string;
  routeType: string;
}

export const useBusStopsData = (city: string = 'Delhi') => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

  // Delhi bounding box coordinates
  const delhiBbox: [number, number, number, number] = [76.85, 28.40, 77.35, 28.88];

  const { data: stopsData, isLoading: stopsLoading } = useQuery({
    queryKey: ['bus-stops', city],
    queryFn: () => osmApi.getBusStops(city, delhiBbox),
    staleTime: 30 * 60 * 1000, // Data is fresh for 30 minutes
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
  });

  const { data: routesData, isLoading: routesLoading } = useQuery({
    queryKey: ['bus-routes', city],
    queryFn: () => osmApi.getBusRoutes(delhiBbox),
    staleTime: 30 * 60 * 1000, // Data is fresh for 30 minutes
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
  });

  useEffect(() => {
    if (stopsData) {
      setBusStops(stopsData);
    }
  }, [stopsData]);

  useEffect(() => {
    if (routesData) {
      setBusRoutes(routesData);
    }
  }, [routesData]);

  return {
    busStops,
    busRoutes,
    isLoading: stopsLoading || routesLoading,
    stopsCount: busStops.length,
    routesCount: busRoutes.length
  };
};
