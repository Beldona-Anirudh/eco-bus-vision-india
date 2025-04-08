
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { FleetSummary } from '../components/dashboard/FleetSummary';
import { BusTypeDistribution } from '../components/dashboard/BusTypeDistribution';
import { DetailedFleetTable } from '../components/dashboard/DetailedFleetTable';
import { fleetOverviewData, busesData } from '../data/mockData';

const FleetPage = () => {
  // Calculate number of buses in each status
  const chargingBuses = busesData.filter(bus => bus.status === 'charging').length;
  const maintenanceBuses = busesData.filter(bus => bus.status === 'maintenance').length;
  const activeBuses = busesData.filter(bus => bus.status === 'on-route').length;
  const idleBuses = busesData.filter(bus => bus.status === 'idle').length;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Fleet Overview</h1>
        <p className="text-muted-foreground">Manage and monitor your entire bus fleet.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <FleetSummary 
          totalBuses={fleetOverviewData.totalBuses}
          activeBuses={activeBuses}
          chargingBuses={chargingBuses}
          maintenanceBuses={maintenanceBuses}
          acBuses={fleetOverviewData.busTypes.ac}
          nonAcBuses={fleetOverviewData.busTypes.nonAc}
        />
        <BusTypeDistribution 
          acBuses={fleetOverviewData.busTypes.ac}
          nonAcBuses={fleetOverviewData.busTypes.nonAc}
        />
      </div>

      <div className="mb-6">
        <DetailedFleetTable buses={busesData} />
      </div>
    </DashboardLayout>
  );
};

export default FleetPage;
