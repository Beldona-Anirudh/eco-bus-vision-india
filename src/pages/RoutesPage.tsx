
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const RoutesPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Route Planner</h1>
        <p className="text-muted-foreground">Plan and optimize your bus routes for efficiency.</p>
      </div>
      
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Route Planning Page</h2>
        <p className="mt-2 text-gray-500">This page will contain route planning tools and optimization metrics.</p>
      </div>
    </DashboardLayout>
  );
};

export default RoutesPage;
