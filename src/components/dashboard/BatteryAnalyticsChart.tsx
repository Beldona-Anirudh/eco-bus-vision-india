
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface BatteryAnalyticsChartProps {
  timeRange: 'day' | 'week' | 'month';
  setTimeRange: (range: 'day' | 'week' | 'month') => void;
}

export const BatteryAnalyticsChart: React.FC<BatteryAnalyticsChartProps> = ({ 
  timeRange, 
  setTimeRange 
}) => {
  // Generate mock data based on selected time range
  const generateData = () => {
    const data = [];
    
    if (timeRange === 'day') {
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i}:00`,
          avgCharge: Math.round(65 + Math.sin(i/3) * 15),
          consumption: Math.round(0.8 + Math.cos(i/6) * 0.5),
          efficiency: Math.round(85 + Math.sin(i/4) * 8)
        });
      }
    } else if (timeRange === 'week') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (let i = 0; i < 7; i++) {
        data.push({
          time: days[i],
          avgCharge: Math.round(70 + Math.sin(i) * 12),
          consumption: Math.round(4.2 + Math.cos(i/2) * 1.2),
          efficiency: Math.round(82 + Math.sin(i/3) * 10)
        });
      }
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < 12; i++) {
        data.push({
          time: months[i],
          avgCharge: Math.round(68 + Math.sin(i/2) * 10),
          consumption: Math.round(125 + Math.cos(i/3) * 30),
          efficiency: Math.round(80 + Math.sin(i/4) * 12)
        });
      }
    }
    
    return data;
  };

  const chartData = generateData();
  
  const config = {
    avgCharge: {
      label: "Average Charge (%)",
      color: "#2563eb" // blue
    },
    consumption: {
      label: `${timeRange === 'day' ? 'Hourly' : timeRange === 'week' ? 'Daily' : 'Monthly'} Consumption (kWh)`,
      color: "#16a34a" // green
    },
    efficiency: {
      label: "Efficiency (%)",
      color: "#d97706" // amber
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Battery Performance</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === 'day' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('day')}
          >
            Day
          </Button>
          <Button 
            variant={timeRange === 'week' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="avgChargeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="avgCharge"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#avgChargeGradient)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="consumption"
                stroke="#16a34a"
                fillOpacity={1}
                fill="url(#consumptionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
