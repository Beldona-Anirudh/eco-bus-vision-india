
// Free API integrations for the bus management system
const getOpenWeatherApiKey = () => localStorage.getItem('openweather_api_key') || 'demo_key';
const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';
const OVERPASS_API_BASE_URL = 'https://overpass-api.de/api/interpreter';

// OpenWeatherMap API (Free tier: 1,000 calls/day)
export const weatherApi = {
  getCurrentWeather: async (city: string = 'Delhi') => {
    try {
      const apiKey = getOpenWeatherApiKey();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Weather API failed');
      }
      return await response.json();
    } catch (error) {
      console.log('Using mock weather data');
      return {
        name: city,
        main: { temp: 28, humidity: 65, feels_like: 30 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        visibility: 10000,
        wind: { speed: 3.5 },
        coord: { lat: 28.7041, lon: 77.1025 }
      };
    }
  },

  getWeatherForecast: async (city: string = 'Delhi') => {
    try {
      const apiKey = getOpenWeatherApiKey();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Forecast API failed');
      }
      return await response.json();
    } catch (error) {
      console.log('Using mock forecast data');
      return {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt: Date.now() / 1000 + (i * 24 * 60 * 60),
          dt_txt: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
          main: { temp: 25 + Math.random() * 10, humidity: 60 + Math.random() * 30 },
          weather: [{ 
            main: Math.random() > 0.5 ? 'Clear' : 'Rain',
            description: Math.random() > 0.5 ? 'clear sky' : 'light rain',
            icon: Math.random() > 0.5 ? '01d' : '10d'
          }]
        }))
      };
    }
  },

  getAirQuality: async (lat: number = 28.7041, lon: number = 77.1025) => {
    try {
      const apiKey = getOpenWeatherApiKey();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Air quality API failed');
      }
      return await response.json();
    } catch (error) {
      console.log('Using mock air quality data');
      return {
        list: [{
          main: { aqi: 3 },
          components: { co: 233.48, no: 0.16, no2: 5.15, o3: 151.87, so2: 2.57, pm2_5: 8.04, pm10: 13.33, nh3: 2.48 }
        }]
      };
    }
  }
};

// REST Countries API (Completely free)
export const countriesApi = {
  getCountryInfo: async (countryName: string = 'India') => {
    try {
      const response = await fetch(`${REST_COUNTRIES_BASE_URL}/name/${countryName}`);
      if (!response.ok) throw new Error('Country not found');
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.log('Using mock country data');
      return {
        name: { common: 'India' },
        capital: ['New Delhi'],
        population: 1380004385,
        timezones: ['UTC+05:30'],
        currencies: { INR: { name: 'Indian rupee', symbol: '₹' } },
        latlng: [20.0, 77.0]
      };
    }
  },

  getAllCountries: async () => {
    try {
      const response = await fetch(`${REST_COUNTRIES_BASE_URL}/all?fields=name,capital,population,latlng`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      return await response.json();
    } catch (error) {
      console.log('Using mock countries data');
      return [
        { name: { common: 'India' }, capital: ['New Delhi'], population: 1380004385, latlng: [20.0, 77.0] },
        { name: { common: 'United States' }, capital: ['Washington, D.C.'], population: 331002651, latlng: [39.0, -77.0] }
      ];
    }
  }
};

// OpenStreetMap Overpass API (Completely free)
export const osmApi = {
  getBusStops: async (city: string = 'Delhi', bbox: [number, number, number, number] = [76.85, 28.40, 77.35, 28.88]) => {
    const query = `
      [out:json][timeout:25];
      (
        node["public_transport"="stop_position"]["bus"="yes"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
        node["highway"="bus_stop"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
      );
      out body;
    `;

    try {
      const response = await fetch(OVERPASS_API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: query
      });
      
      if (!response.ok) throw new Error('Failed to fetch bus stops');
      const data = await response.json();
      
      return data.elements.map((stop: any) => ({
        id: stop.id,
        name: stop.tags?.name || `Stop ${stop.id}`,
        lat: stop.lat,
        lon: stop.lon,
        type: stop.tags?.public_transport || 'bus_stop',
        operator: stop.tags?.operator || 'Unknown',
        wheelchair: stop.tags?.wheelchair === 'yes',
        shelter: stop.tags?.shelter === 'yes',
        bench: stop.tags?.bench === 'yes'
      }));
    } catch (error) {
      console.log('Using mock bus stops data');
      return [
        { id: 1, name: 'Connaught Place', lat: 28.6315, lon: 77.2167, type: 'bus_stop', operator: 'DTC', wheelchair: true, shelter: true, bench: true },
        { id: 2, name: 'India Gate', lat: 28.6129, lon: 77.2295, type: 'bus_stop', operator: 'DTC', wheelchair: true, shelter: false, bench: true },
        { id: 3, name: 'Red Fort', lat: 28.6562, lon: 77.2410, type: 'bus_stop', operator: 'DTC', wheelchair: false, shelter: true, bench: true },
        { id: 4, name: 'Lotus Temple', lat: 28.5535, lon: 77.2588, type: 'bus_stop', operator: 'DTC', wheelchair: true, shelter: true, bench: false },
        { id: 5, name: 'Qutub Minar', lat: 28.5244, lon: 77.1855, type: 'bus_stop', operator: 'DTC', wheelchair: false, shelter: false, bench: true },
        { id: 6, name: 'AIIMS Metro Station', lat: 28.5687, lon: 77.2077, type: 'bus_stop', operator: 'DTC', wheelchair: true, shelter: true, bench: true },
        { id: 7, name: 'Karol Bagh', lat: 28.6519, lon: 77.1909, type: 'bus_stop', operator: 'DTC', wheelchair: true, shelter: true, bench: true },
        { id: 8, name: 'Rajouri Garden', lat: 28.6460, lon: 77.1214, type: 'bus_stop', operator: 'DTC', wheelchair: false, shelter: true, bench: true }
      ];
    }
  },

  getBusRoutes: async (bbox: [number, number, number, number] = [76.85, 28.40, 77.35, 28.88]) => {
    const query = `
      [out:json][timeout:25];
      (
        relation["type"="route"]["route"="bus"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
      );
      out body;
    `;

    try {
      const response = await fetch(OVERPASS_API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: query
      });
      
      if (!response.ok) throw new Error('Failed to fetch bus routes');
      const data = await response.json();
      
      return data.elements.map((route: any) => ({
        id: route.id,
        name: route.tags?.name || route.tags?.ref || `Route ${route.id}`,
        ref: route.tags?.ref || `R${route.id}`,
        operator: route.tags?.operator || 'Delhi Transport Corporation',
        from: route.tags?.from || 'Unknown',
        to: route.tags?.to || 'Unknown',
        routeType: route.tags?.route || 'bus',
        wheelchair: route.tags?.wheelchair === 'yes',
        colour: route.tags?.colour || '#0ea5e9'
      }));
    } catch (error) {
      console.log('Using mock routes data');
      return [
        { id: 1, name: 'Red Line Express', ref: 'R1', operator: 'DTC', from: 'Connaught Place', to: 'India Gate', routeType: 'bus', wheelchair: true, colour: '#dc2626' },
        { id: 2, name: 'Blue Circle', ref: 'R2', operator: 'DTC', from: 'Red Fort', to: 'Lotus Temple', routeType: 'bus', wheelchair: true, colour: '#2563eb' },
        { id: 3, name: 'Green Metro Feeder', ref: 'R3', operator: 'DTC', from: 'Qutub Minar', to: 'AIIMS Metro', routeType: 'bus', wheelchair: false, colour: '#16a34a' },
        { id: 4, name: 'Yellow Heritage Route', ref: 'R4', operator: 'DTC', from: 'Karol Bagh', to: 'Rajouri Garden', routeType: 'bus', wheelchair: true, colour: '#eab308' }
      ];
    }
  },

  getRoutePaths: async (routeId: number) => {
    // This would fetch the actual route geometry, for now return mock path
    const mockPaths = {
      1: [[77.2167, 28.6315], [77.2295, 28.6129]], // Connaught Place to India Gate
      2: [[77.2410, 28.6562], [77.2588, 28.5535]], // Red Fort to Lotus Temple
      3: [[77.1855, 28.5244], [77.2077, 28.5687]], // Qutub Minar to AIIMS
      4: [[77.1909, 28.6519], [77.1214, 28.6460]]  // Karol Bagh to Rajouri Garden
    };
    return mockPaths[routeId as keyof typeof mockPaths] || [];
  }
};

// Enhanced bus fleet simulation with real-time data
export const fleetApi = {
  generateLiveBusData: (busStops: any[], routes: any[]) => {
    return Array.from({ length: 15 }, (_, i) => {
      const route = routes[i % routes.length];
      const randomStop = busStops[Math.floor(Math.random() * busStops.length)];
      const batteryLevel = 20 + Math.random() * 80;
      const speed = 15 + Math.random() * 45;
      
      return {
        id: `DL-${String(i + 1).padStart(2, '0')}-EA-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `Bus ${String(i + 1).padStart(3, '0')}`,
        route: route?.ref || `R${i + 1}`,
        routeName: route?.name || `Route ${i + 1}`,
        driver: `Driver ${String.fromCharCode(65 + (i % 26))}. ${['Singh', 'Kumar', 'Sharma', 'Gupta', 'Verma'][i % 5]}`,
        status: ['on-route', 'charging', 'maintenance', 'idle'][Math.floor(Math.random() * 4)] as 'on-route' | 'charging' | 'maintenance' | 'idle',
        batteryLevel: Math.round(batteryLevel),
        estimatedRange: Math.round(batteryLevel * 2.5),
        energyEfficiency: {
          value: Number((0.6 + Math.random() * 0.8).toFixed(2)),
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
        },
        type: Math.random() > 0.6 ? 'ac' : 'non-ac' as 'ac' | 'non-ac',
        model: ['Tata Ultra Electric', 'Ashok Leyland Circuit', 'BYD K7', 'Olectra C09'][Math.floor(Math.random() * 4)],
        capacity: [32, 40, 45, 52][Math.floor(Math.random() * 4)],
        yearManufactured: 2020 + Math.floor(Math.random() * 4),
        currentLocation: {
          lat: randomStop.lat + (Math.random() - 0.5) * 0.01,
          lon: randomStop.lon + (Math.random() - 0.5) * 0.01,
          stopName: randomStop.name,
          speed: Math.round(speed),
          heading: Math.floor(Math.random() * 360)
        },
        passengers: {
          current: Math.floor(Math.random() * 45),
          capacity: [32, 40, 45, 52][Math.floor(Math.random() * 4)],
          averageDaily: Math.floor(200 + Math.random() * 300)
        },
        schedule: {
          nextStop: busStops[Math.floor(Math.random() * busStops.length)].name,
          eta: Math.floor(3 + Math.random() * 15),
          departureTime: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          completedTrips: Math.floor(Math.random() * 8),
          totalTripsToday: Math.floor(6 + Math.random() * 4)
        }
      };
    });
  }
};

// Utility function to check API availability
export const checkApiStatus = async () => {
  const status = {
    weather: false,
    countries: false,
    osm: false
  };

  try {
    const apiKey = getOpenWeatherApiKey();
    const weatherTest = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${apiKey}&units=metric`);
    status.weather = weatherTest.ok;
  } catch (error) {
    console.log('Weather API not reachable');
  }

  try {
    const countriesTest = await fetch(`${REST_COUNTRIES_BASE_URL}/name/india`);
    status.countries = countriesTest.ok;
  } catch (error) {
    console.log('Countries API not reachable');
  }

  try {
    const osmTest = await fetch(OVERPASS_API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: '[out:json][timeout:5];(node(1););out;'
    });
    status.osm = osmTest.ok;
  } catch (error) {
    console.log('OSM API not reachable');
  }

  return status;
};
