
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const RealtimeAnalytics: React.FC = () => {
  const { realtimeData, averageSpeed, busUtilization, energyEfficiency, isError } = useRealTimeData();

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to fetch transit data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Speed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="speed" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Average Speed: {averageSpeed.toFixed(1)} km/h
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bus Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="utilization" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Current Utilization: {busUtilization}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
