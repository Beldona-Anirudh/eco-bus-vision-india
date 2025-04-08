
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and account settings.</p>
      </div>
      
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Settings Page</h2>
        <p className="mt-2 text-gray-500">This page will contain system configuration options and user preferences.</p>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
