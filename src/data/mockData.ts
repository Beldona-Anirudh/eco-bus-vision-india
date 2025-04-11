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
  { 
    id: "BLR-EB-006", 
    name: "eBus 006",
    route: "Route 118", 
    driver: "Rahul Desai", 
    status: "on-route" as const, 
    batteryLevel: 72, 
    estimatedRange: 160,
    energyEfficiency: { value: 0.82, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-007", 
    name: "eBus 007",
    route: "Route 301", 
    driver: "Neha Gupta", 
    status: "on-route" as const, 
    batteryLevel: 58, 
    estimatedRange: 125,
    energyEfficiency: { value: 0.90, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-008", 
    name: "eBus 008",
    route: "Route 402", 
    driver: "Kiran Sharma", 
    status: "maintenance" as const, 
    batteryLevel: 10, 
    estimatedRange: 22,
    energyEfficiency: { value: 1.10, trend: "down" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-009", 
    name: "eBus 009",
    route: "Route 501", 
    driver: "Deepak Verma", 
    status: "charging" as const, 
    batteryLevel: 35, 
    estimatedRange: 80,
    energyEfficiency: { value: 0.87, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 10m",
    capacity: 38,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-010", 
    name: "eBus 010",
    route: "Route 118", 
    driver: "Ananya Reddy", 
    status: "idle" as const, 
    batteryLevel: 90, 
    estimatedRange: 200,
    energyEfficiency: { value: 0.80, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-011", 
    name: "eBus 011",
    route: "Route 221", 
    driver: "Vijay Kumar", 
    status: "on-route" as const, 
    batteryLevel: 62, 
    estimatedRange: 138,
    energyEfficiency: { value: 0.86, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-012", 
    name: "eBus 012",
    route: "Route 117", 
    driver: "Sanjay Joshi", 
    status: "on-route" as const, 
    batteryLevel: 55, 
    estimatedRange: 120,
    energyEfficiency: { value: 0.89, trend: "down" as const },
    type: "ac" as const,
    model: "Eco City 10m",
    capacity: 38,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-013", 
    name: "eBus 013",
    route: "Route 335", 
    driver: "Pooja Singh", 
    status: "on-route" as const, 
    batteryLevel: 48, 
    estimatedRange: 105,
    energyEfficiency: { value: 0.91, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-014", 
    name: "eBus 014",
    route: "Route 442", 
    driver: "Rajeev Kapoor", 
    status: "maintenance" as const, 
    batteryLevel: 20, 
    estimatedRange: 42,
    energyEfficiency: { value: 1.02, trend: "down" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-015", 
    name: "eBus 015",
    route: "Route 501", 
    driver: "Meera Iyer", 
    status: "charging" as const, 
    batteryLevel: 28, 
    estimatedRange: 65,
    energyEfficiency: { value: 0.93, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 10m",
    capacity: 38,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-016", 
    name: "eBus 016",
    route: "Route 118", 
    driver: "Suresh Rao", 
    status: "on-route" as const, 
    batteryLevel: 70, 
    estimatedRange: 155,
    energyEfficiency: { value: 0.84, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2023
  },
  { 
    id: "BLR-EB-017", 
    name: "eBus 017",
    route: "Route 301", 
    driver: "Kavita Nair", 
    status: "on-route" as const, 
    batteryLevel: 52, 
    estimatedRange: 115,
    energyEfficiency: { value: 0.88, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2023
  },
  { 
    id: "BLR-EB-018", 
    name: "eBus 018",
    route: "Route 402", 
    driver: "Prakash Raj", 
    status: "idle" as const, 
    batteryLevel: 88, 
    estimatedRange: 195,
    energyEfficiency: { value: 0.81, trend: "up" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-019", 
    name: "eBus 019",
    route: "Route 501", 
    driver: "Divya Menon", 
    status: "on-route" as const, 
    batteryLevel: 60, 
    estimatedRange: 132,
    energyEfficiency: { value: 0.87, trend: "down" as const },
    type: "ac" as const,
    model: "Eco City 10m",
    capacity: 38,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-020", 
    name: "eBus 020",
    route: "Route 221", 
    driver: "Rohit Malhotra", 
    status: "on-route" as const, 
    batteryLevel: 65, 
    estimatedRange: 142,
    energyEfficiency: { value: 0.85, trend: "stable" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-021", 
    name: "eBus 021",
    route: "Route 117", 
    driver: "Sonia Grewal", 
    status: "maintenance" as const, 
    batteryLevel: 18, 
    estimatedRange: 38,
    energyEfficiency: { value: 1.00, trend: "down" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-022", 
    name: "eBus 022",
    route: "Route 335", 
    driver: "Arjun Nair", 
    status: "on-route" as const, 
    batteryLevel: 50, 
    estimatedRange: 110,
    energyEfficiency: { value: 0.90, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 12m",
    capacity: 42,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-023", 
    name: "eBus 023",
    route: "Route 442", 
    driver: "Maya Sharma", 
    status: "on-route" as const, 
    batteryLevel: 58, 
    estimatedRange: 125,
    energyEfficiency: { value: 0.89, trend: "stable" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2022
  },
  { 
    id: "BLR-EB-024", 
    name: "eBus 024",
    route: "Route 501", 
    driver: "Vivek Menon", 
    status: "idle" as const, 
    batteryLevel: 92, 
    estimatedRange: 205,
    energyEfficiency: { value: 0.79, trend: "up" as const },
    type: "ac" as const,
    model: "Eco City 10m",
    capacity: 38,
    yearManufactured: 2021
  },
  { 
    id: "BLR-EB-025", 
    name: "eBus 025",
    route: "Route 118", 
    driver: "Nitya Iyer", 
    status: "on-route" as const, 
    batteryLevel: 63, 
    estimatedRange: 140,
    energyEfficiency: { value: 0.86, trend: "down" as const },
    type: "non-ac" as const,
    model: "Eco Mini 8m",
    capacity: 32,
    yearManufactured: 2022
  }
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

// Route optimization factors
export const routeOptimizationData = {
  weatherFactors: {
    sunny: { impact: 0, label: "No Impact" },
    cloudy: { impact: 5, label: "Slight Increase" },
    rainy: { impact: 15, label: "Moderate Increase" },
    snowy: { impact: 25, label: "Significant Increase" }
  },
  trafficFactors: {
    light: { impact: 0, label: "Normal Flow" },
    moderate: { impact: 10, label: "Some Delays" },
    heavy: { impact: 25, label: "Major Delays" }
  },
  timeFactors: {
    "off-peak": { impact: 0, label: "Normal Speed" },
    "rush-morning": { impact: 20, label: "Extended Travel Time" },
    "rush-evening": { impact: 18, label: "Extended Travel Time" }
  }
};

export const routeDetails = [
  {
    id: "Route 117",
    name: "Dadar - Andheri Express",
    startLocation: "Dadar Bus Terminal",
    endLocation: "Andheri Station East",
    distance: 15.8,
    minTravelTime: 45,
    maxTravelTime: 75,
    stops: ["Dadar", "Mahim", "Bandra", "Khar", "Santacruz", "Vile Parle", "Andheri"],
    popularity: 85, // percentage of capacity typically used
    peakHours: ["7:00 AM - 10:00 AM", "5:00 PM - 8:00 PM"],
    avgPassengersPerTrip: 36,
    busesOnRoute: ["BLR-EB-003", "BLR-EB-012"]
  },
  {
    id: "Route 118",
    name: "South Mumbai Connector",
    startLocation: "Colaba Bus Depot",
    endLocation: "Lower Parel",
    distance: 12.3,
    minTravelTime: 35,
    maxTravelTime: 65,
    stops: ["Colaba", "Churchgate", "Marine Lines", "Charni Road", "Grant Road", "Mumbai Central", "Lower Parel"],
    popularity: 78,
    peakHours: ["8:00 AM - 11:00 AM", "6:00 PM - 9:00 PM"],
    avgPassengersPerTrip: 34,
    busesOnRoute: ["BLR-EB-006", "BLR-EB-010", "BLR-EB-016", "BLR-EB-025"]
  },
  {
    id: "Route 221",
    name: "Airport Express",
    startLocation: "International Airport T2",
    endLocation: "Nariman Point",
    distance: 24.5,
    minTravelTime: 60,
    maxTravelTime: 90,
    stops: ["Airport T2", "Vile Parle", "Santacruz", "Bandra", "Worli", "Haji Ali", "Nariman Point"],
    popularity: 92,
    peakHours: ["5:00 AM - 9:00 AM", "7:00 PM - 11:00 PM"],
    avgPassengersPerTrip: 38,
    busesOnRoute: ["BLR-EB-001", "BLR-EB-005", "BLR-EB-011", "BLR-EB-020"]
  },
  {
    id: "Route 301",
    name: "East-West Connector",
    startLocation: "Kurla Station",
    endLocation: "Andheri West",
    distance: 13.7,
    minTravelTime: 40,
    maxTravelTime: 70,
    stops: ["Kurla", "BKC", "Dharavi", "Bandra East", "Bandra West", "Khar", "Andheri West"],
    popularity: 75,
    peakHours: ["7:30 AM - 10:30 AM", "5:30 PM - 8:30 PM"],
    avgPassengersPerTrip: 30,
    busesOnRoute: ["BLR-EB-007", "BLR-EB-017"]
  },
  {
    id: "Route 335",
    name: "Suburban Link",
    startLocation: "Thane Station",
    endLocation: "Borivali",
    distance: 32.1,
    minTravelTime: 70,
    maxTravelTime: 120,
    stops: ["Thane", "Mulund", "Bhandup", "Kanjurmarg", "Powai", "Goregaon", "Borivali"],
    popularity: 83,
    peakHours: ["6:30 AM - 9:30 AM", "5:00 PM - 8:00 PM"],
    avgPassengersPerTrip: 35,
    busesOnRoute: ["BLR-EB-002", "BLR-EB-013", "BLR-EB-022"]
  },
  {
    id: "Route 402",
    name: "Eastern Express",
    startLocation: "Chembur",
    endLocation: "CSMT",
    distance: 19.5,
    minTravelTime: 50,
    maxTravelTime: 85,
    stops: ["Chembur", "Sion", "Matunga", "Dadar", "Parel", "Byculla", "CSMT"],
    popularity: 80,
    peakHours: ["8:00 AM - 11:00 AM", "6:00 PM - 9:00 PM"],
    avgPassengersPerTrip: 33,
    busesOnRoute: ["BLR-EB-008", "BLR-EB-018"]
  },
  {
    id: "Route 442",
    name: "Western Express",
    startLocation: "Borivali",
    endLocation: "Churchgate",
    distance: 36.8,
    minTravelTime: 80,
    maxTravelTime: 130,
    stops: ["Borivali", "Kandivali", "Malad", "Goregaon", "Andheri", "Bandra", "Dadar", "Churchgate"],
    popularity: 87,
    peakHours: ["7:00 AM - 10:00 AM", "6:00 PM - 9:00 PM"],
    avgPassengersPerTrip: 37,
    busesOnRoute: ["BLR-EB-004", "BLR-EB-014", "BLR-EB-023"]
  },
  {
    id: "Route 501",
    name: "Navi Mumbai Connector",
    startLocation: "Vashi",
    endLocation: "Belapur CBD",
    distance: 14.2,
    minTravelTime: 30,
    maxTravelTime: 60,
    stops: ["Vashi", "Sanpada", "Juinagar", "Nerul", "Seawoods", "Belapur CBD"],
    popularity: 72,
    peakHours: ["8:30 AM - 11:30 AM", "5:30 PM - 8:30 PM"],
    avgPassengersPerTrip: 29,
    busesOnRoute: ["BLR-EB-009", "BLR-EB-015", "BLR-EB-019", "BLR-EB-024"]
  }
];
