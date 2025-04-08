
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const BatteryPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Battery Analytics</h1>
        <p className="text-muted-foreground">Monitor and optimize battery performance across your fleet.</p>
      </div>
      
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Battery Management Page</h2>
        <p className="mt-2 text-gray-500">This page will contain detailed battery analytics and optimization tools.</p>
      </div>
    </DashboardLayout>
  );
};

export default BatteryPage;
