
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const LocationsPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
        <p className="text-muted-foreground">Track and manage all bus locations and charging stations.</p>
      </div>
      
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Locations Management Page</h2>
        <p className="mt-2 text-gray-500">This page will contain location tracking and management features.</p>
      </div>
    </DashboardLayout>
  );
};

export default LocationsPage;
