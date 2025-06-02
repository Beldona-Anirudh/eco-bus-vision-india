
// Free API integrations for the bus management system
const OPENWEATHER_API_KEY = 'demo_key'; // Users can replace with their free key from openweathermap.org
const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';
const OVERPASS_API_BASE_URL = 'https://overpass-api.de/api/interpreter';

// OpenWeatherMap API (Free tier: 1,000 calls/day)
export const weatherApi = {
  getCurrentWeather: async (city: string = 'Delhi') => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      if (!response.ok) {
        // Fallback to mock data if API fails
        return {
          name: city,
          main: { temp: 28, humidity: 65 },
          weather: [{ main: 'Clear', description: 'clear sky' }],
          visibility: 10000,
          wind: { speed: 3.5 }
        };
      }
      return await response.json();
    } catch (error) {
      console.log('Using mock weather data');
      return {
        name: city,
        main: { temp: 28, humidity: 65 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        visibility: 10000,
        wind: { speed: 3.5 }
      };
    }
  },

  getWeatherForecast: async (city: string = 'Delhi') => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      if (!response.ok) {
        // Fallback to mock forecast data
        return {
          list: Array.from({ length: 5 }, (_, i) => ({
            dt_txt: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
            main: { temp: 25 + Math.random() * 10 },
            weather: [{ main: Math.random() > 0.5 ? 'Clear' : 'Rain' }]
          }))
        };
      }
      return await response.json();
    } catch (error) {
      console.log('Using mock forecast data');
      return {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt_txt: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
          main: { temp: 25 + Math.random() * 10 },
          weather: [{ main: Math.random() > 0.5 ? 'Clear' : 'Rain' }]
        }))
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
        currencies: { INR: { name: 'Indian rupee', symbol: '₹' } }
      };
    }
  },

  getAllCountries: async () => {
    try {
      const response = await fetch(`${REST_COUNTRIES_BASE_URL}/all?fields=name,capital,population`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      return await response.json();
    } catch (error) {
      console.log('Using mock countries data');
      return [
        { name: { common: 'India' }, capital: ['New Delhi'], population: 1380004385 },
        { name: { common: 'United States' }, capital: ['Washington, D.C.'], population: 331002651 }
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
        type: stop.tags?.public_transport || 'bus_stop'
      }));
    } catch (error) {
      console.log('Using mock bus stops data');
      return [
        { id: 1, name: 'Connaught Place', lat: 28.6315, lon: 77.2167, type: 'bus_stop' },
        { id: 2, name: 'India Gate', lat: 28.6129, lon: 77.2295, type: 'bus_stop' },
        { id: 3, name: 'Red Fort', lat: 28.6562, lon: 77.2410, type: 'bus_stop' },
        { id: 4, name: 'Lotus Temple', lat: 28.5535, lon: 77.2588, type: 'bus_stop' },
        { id: 5, name: 'Qutub Minar', lat: 28.5244, lon: 77.1855, type: 'bus_stop' }
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
        operator: route.tags?.operator || 'Delhi Transport Corporation',
        from: route.tags?.from || 'Unknown',
        to: route.tags?.to || 'Unknown',
        routeType: route.tags?.route || 'bus'
      }));
    } catch (error) {
      console.log('Using mock routes data');
      return [
        { id: 1, name: 'Route 101', operator: 'DTC', from: 'Connaught Place', to: 'India Gate', routeType: 'bus' },
        { id: 2, name: 'Route 102', operator: 'DTC', from: 'Red Fort', to: 'Lotus Temple', routeType: 'bus' },
        { id: 3, name: 'Route 103', operator: 'DTC', from: 'Qutub Minar', to: 'Connaught Place', routeType: 'bus' }
      ];
    }
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
    const weatherTest = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=test');
    status.weather = weatherTest.status !== 401; // 401 means invalid key, but API is reachable
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
      body: '[out:json][timeout:1];(node(0););out;'
    });
    status.osm = osmTest.ok;
  } catch (error) {
    console.log('OSM API not reachable');
  }

  return status;
};
