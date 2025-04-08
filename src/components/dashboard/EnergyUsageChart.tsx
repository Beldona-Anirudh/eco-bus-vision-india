
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface EnergyUsageChartProps {
  data: {
    daily: {
      name: string;
      energy: number;
      prediction: number;
    }[];
    weekly: {
      name: string;
      energy: number;
      prediction: number;
    }[];
    monthly: {
      name: string;
      energy: number;
      prediction: number;
    }[];
  };
}

export const EnergyUsageChart: React.FC<EnergyUsageChartProps> = ({ data }) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Energy Consumption</CardTitle>
        <Tabs 
          defaultValue="daily" 
          onValueChange={(value) => setPeriod(value as 'daily' | 'weekly' | 'monthly')}
          className="w-auto"
        >
          <TabsList className="grid w-auto grid-cols-3 h-8">
            <TabsTrigger value="daily" className="text-xs px-3">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs px-3">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs px-3">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data[period]}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value} kWh`}
              />
              <Tooltip 
                formatter={(value) => [`${value} kWh`, undefined]}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  border: 'none',
                  padding: '8px 12px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Bar 
                dataKey="energy" 
                name="Actual Usage" 
                fill="#0ea5e9" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="prediction" 
                name="Predicted Usage" 
                fill="#22c55e" 
                radius={[4, 4, 0, 0]} 
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Consumption</p>
            <p className="text-lg font-bold">15,284 kWh</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avg. per Bus</p>
            <p className="text-lg font-bold">254 kWh</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Prediction Accuracy</p>
            <p className="text-lg font-bold">92.7%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Cost</p>
            <p className="text-lg font-bold">₹91,704</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
