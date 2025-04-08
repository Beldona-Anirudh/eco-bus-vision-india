
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const SchedulePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">Manage bus schedules and driver assignments.</p>
      </div>
      
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Schedule Management Page</h2>
        <p className="mt-2 text-gray-500">This page will contain scheduling tools and calendar features.</p>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;
