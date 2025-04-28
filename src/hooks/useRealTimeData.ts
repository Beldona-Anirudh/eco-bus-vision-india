
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface RealTimeDataPoint {
  timestamp: string;
  speed: number;
  utilization: number;
  energyEfficiency: number;
  location: [number, number];
}

const TRANSITLAND_API_KEY = 'prj_live_sk_f1246f2c25b04762a190683d50e9e2d1'; // Public demo key
const DELHI_BOUNDS = {
  north: 28.88,
  south: 28.40,
  east: 77.35,
  west: 76.85
};

const fetchDelhiTransitData = async () => {
  const response = await fetch(
    `https://transit.land/api/v2/rest/routes?bbox=${DELHI_BOUNDS.west},${DELHI_BOUNDS.south},${DELHI_BOUNDS.east},${DELHI_BOUNDS.north}&api_key=${TRANSITLAND_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch Delhi transit data');
  }
  
  return response.json();
};

export const useRealTimeData = () => {
  const [realtimeData, setRealtimeData] = useState<RealTimeDataPoint[]>([]);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [busUtilization, setBusUtilization] = useState(0);
  const [energyEfficiency, setEnergyEfficiency] = useState(0);
  const [busLocations, setBusLocations] = useState<Array<{id: string, location: [number, number], speed: number}>>([]);

  const { data: transitData, isError } = useQuery({
    queryKey: ['delhi-transit-data'],
    queryFn: fetchDelhiTransitData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (!transitData) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      
      // Generate realistic bus locations around Delhi
      const newBusLocations = Array.from({ length: 10 }).map((_, index) => ({
        id: `bus-${index}`,
        location: [
          DELHI_BOUNDS.west + Math.random() * (DELHI_BOUNDS.east - DELHI_BOUNDS.west),
          DELHI_BOUNDS.south + Math.random() * (DELHI_BOUNDS.north - DELHI_BOUNDS.south)
        ] as [number, number],
        speed: 20 + Math.random() * 40
      }));

      setBusLocations(newBusLocations);
      
      // Calculate metrics based on actual routes and simulated bus movements
      const routesCount = transitData.routes?.length || 0;
      const avgSpeed = newBusLocations.reduce((acc, bus) => acc + bus.speed, 0) / newBusLocations.length;
      const utilization = (routesCount / 100) * 80 + Math.random() * 20;
      const efficiency = 0.8 + (routesCount / 1000);

      const newDataPoint = {
        timestamp,
        speed: avgSpeed,
        utilization,
        energyEfficiency: efficiency,
        location: [77.1025, 28.7041] as [number, number] // Delhi center
      };

      setRealtimeData(prev => {
        const newData = [...prev, newDataPoint];
        return newData.slice(-10);
      });

      setAverageSpeed(avgSpeed);
      setBusUtilization(utilization);
      setEnergyEfficiency(efficiency);
    }, 3000);

    return () => clearInterval(interval);
  }, [transitData]);

  return {
    realtimeData,
    averageSpeed,
    busUtilization,
    energyEfficiency,
    busLocations,
    isError
  };
};
