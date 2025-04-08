// This file contains mock data for our dashboard
// In a real application, this would come from an API

export const fleetOverviewData = {
  totalBuses: 25,
  activeBuses: 18,
  inMaintenance: 4,
  charging: 3,
  busTypes: {
    ac: 15,
    nonAc: 10
  }
};

export const energyMetrics = {
  totalUsage: 15284,
  averagePerBus: 254,
  costPerKwh: 6, // In rupees
  predictedSavings: 12.7,
};

export const busesData = [
  { 
    id: "BLR-EB-001", 
    name: "eBus 001",
    route: "Route 221", 
    driver: "Amit Singh", 
    status: "on-route" as const, 
    batteryLevel: 68, 
    estimatedRange: 145,
    energyEfficiency: { value: 0.85, trend: "down" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-002", 
    name: "eBus 002",
    route: "Route 335", 
    driver: "Priya Patel", 
    status: "on-route" as const, 
    batteryLevel: 45, 
    estimatedRange: 98,
    energyEfficiency: { value: 0.92, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-003", 
    name: "eBus 003",
    route: "Route 117", 
    driver: "Rajiv Kumar", 
    status: "charging" as const, 
    batteryLevel: 32, 
    estimatedRange: 74,
    energyEfficiency: { value: 0.88, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 10m",
    capacity: 38,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-004", 
    name: "eBus 004",
    route: "Route 442", 
    driver: "Sunita Sharma", 
    status: "maintenance" as const, 
    batteryLevel: 15, 
    estimatedRange: 35,
    energyEfficiency: { value: 1.05, trend: "up" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-005", 
    name: "eBus 005",
    route: "Route 221", 
    driver: "Vikram Mehta", 
    status: "idle" as const, 
    batteryLevel: 94, 
    estimatedRange: 210,
    energyEfficiency: { value: 0.78, trend: "down" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2023
  },
];

export const batteryStatusData = [
  { 
    id: "BLR-EB-001", 
    name: "eBus 001", 
    batteryLevel: 68, 
    status: "discharging" as const, 
    estimatedRange: 145,
    type: "ac" as const
  },
  { 
    id: "BLR-EB-003", 
    name: "eBus 003", 
    batteryLevel: 32, 
    status: "charging" as const, 
    estimatedRange: 74,
    type: "ac" as const
  },
  { 
    id: "BLR-EB-004", 
    name: "eBus 004", 
    batteryLevel: 15, 
    status: "idle" as const, 
    estimatedRange: 35,
    type: "non-ac" as const
  },
  { 
    id: "BLR-EB-005", 
    name: "eBus 005", 
    batteryLevel: 94, 
    status: "idle" as const, 
    estimatedRange: 210,
    type: "non-ac" as const
  },
];

export const energyUsageData = {
  daily: [
    { name: "Mon", energy: 254, prediction: 240 },
    { name: "Tue", energy: 285, prediction: 270 },
    { name: "Wed", energy: 275, prediction: 285 },
    { name: "Thu", energy: 240, prediction: 245 },
    { name: "Fri", energy: 290, prediction: 280 },
    { name: "Sat", energy: 190, prediction: 200 },
    { name: "Sun", energy: 180, prediction: 170 },
  ],
  weekly: [
    { name: "Week 1", energy: 1450, prediction: 1400 },
    { name: "Week 2", energy: 1380, prediction: 1420 },
    { name: "Week 3", energy: 1520, prediction: 1500 },
    { name: "Week 4", energy: 1410, prediction: 1450 },
  ],
  monthly: [
    { name: "Jan", energy: 5840, prediction: 5700 },
    { name: "Feb", energy: 5420, prediction: 5500 },
    { name: "Mar", energy: 5950, prediction: 6000 },
    { name: "Apr", energy: 6120, prediction: 6000 },
    { name: "May", energy: 6340, prediction: 6200 },
    { name: "Jun", energy: 5980, prediction: 6100 },
  ],
};

export const weatherForecastData = [
  { day: "Today", weather: "sunny" as const, temperature: 32, energyImpact: -2.5 },
  { day: "Tomorrow", weather: "sunny" as const, temperature: 34, energyImpact: 3.8 },
  { day: "Wednesday", weather: "rainy" as const, temperature: 28, energyImpact: 7.2 },
  { day: "Thursday", weather: "rainy" as const, temperature: 27, energyImpact: 6.5 },
  { day: "Friday", weather: "cloudy" as const, temperature: 30, energyImpact: 1.2 },
];

export const routeData = {
  activeRoutes: 5,
  busesOnRoad: 12,
  avgEnergyUsage: 0.87,
  changePercentage: -5,
};
