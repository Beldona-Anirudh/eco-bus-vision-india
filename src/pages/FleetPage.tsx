
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const FleetPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Fleet Overview</h1>
        <p className="text-muted-foreground">Manage and monitor your entire bus fleet.</p>
      </div>
      
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Fleet Management Page</h2>
        <p className="mt-2 text-gray-500">This page will contain detailed fleet information and management tools.</p>
      </div>
    </DashboardLayout>
  );
};

export default FleetPage;
