import { useState, useEffect } from 'react';
import { busesData } from '../data/mockData';

interface RealTimeDataPoint {
  timestamp: string;
  speed: number;
  utilization: number;
  energyEfficiency: number;
}

export const useRealTimeData = () => {
  const [realtimeData, setRealtimeData] = useState<RealTimeDataPoint[]>([]);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [busUtilization, setBusUtilization] = useState(0);
  const [energyEfficiency, setEnergyEfficiency] = useState(0);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString();
      
      // Simulate speed between 20-60 km/h
      const speed = 20 + Math.random() * 40;
      
      // Calculate utilization based on current passengers vs capacity
      const totalCapacity = busesData.reduce((acc, bus) => acc + bus.capacity, 0);
      const currentPassengers = busesData.reduce((acc, bus) => {
        return acc + Math.floor(Math.random() * bus.capacity);
      }, 0);
      const utilization = (currentPassengers / totalCapacity) * 100;
      
      // Simulate energy efficiency (kWh/km)
      const energyEfficiency = 0.8 + Math.random() * 0.4;

      const newDataPoint = {
        timestamp,
        speed,
        utilization,
        energyEfficiency
      };

      setRealtimeData(prev => {
        const newData = [...prev, newDataPoint];
        // Keep last 10 data points
        return newData.slice(-10);
      });

      // Update averages
      setAverageSpeed(speed);
      setBusUtilization(utilization);
      setEnergyEfficiency(energyEfficiency);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    realtimeData,
    averageSpeed,
    busUtilization,
    energyEfficiency
  };
};
