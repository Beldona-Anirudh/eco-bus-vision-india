
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BatteryAnalyticsChart } from '../components/dashboard/BatteryAnalyticsChart';
import { BatteryStatusCard } from '../components/dashboard/BatteryStatusCard';
import { BatteryDetailedTable } from '../components/dashboard/BatteryDetailedTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { busesData } from '../data/mockData';

const BatteryPage = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  
  // Add passenger data to each bus for display
  const busesWithPassengers = busesData.map(bus => ({
    ...bus,
    passengers: {
      current: Math.floor(Math.random() * (bus.capacity + 1)),
      capacity: bus.capacity,
      averageDaily: Math.floor(Math.random() * 300) + 100
    }
  }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Battery Analytics</h1>
        <p className="text-muted-foreground">Monitor and optimize battery performance across your fleet.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <BatteryStatusCard 
          buses={busesWithPassengers.slice(0, 5).map(bus => ({
            id: bus.id,
            name: bus.name,
            batteryLevel: bus.batteryLevel,
            status: bus.status === 'charging' ? 'charging' : bus.status === 'on-route' ? 'discharging' : 'idle',
            estimatedRange: Math.round(bus.batteryLevel * 2.5),
            type: bus.type
          }))} 
        />
        <BatteryAnalyticsChart timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="all">All Buses</TabsTrigger>
          <TabsTrigger value="ac">AC Buses</TabsTrigger>
          <TabsTrigger value="non-ac">Non-AC Buses</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <BatteryDetailedTable buses={busesWithPassengers} />
        </TabsContent>
        <TabsContent value="ac">
          <BatteryDetailedTable buses={busesWithPassengers.filter(bus => bus.type === 'ac')} />
        </TabsContent>
        <TabsContent value="non-ac">
          <BatteryDetailedTable buses={busesWithPassengers.filter(bus => bus.type === 'non-ac')} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default BatteryPage;
