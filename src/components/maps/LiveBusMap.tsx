
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLiveBusData } from '../../hooks/useLiveBusData';

interface LiveBusMapProps {
  mapboxToken: string;
  height?: string;
}

export const LiveBusMap: React.FC<LiveBusMapProps> = ({ mapboxToken, height = "500px" }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { liveBusData, busStops, busRoutes } = useLiveBusData();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.1, 28.6], // Delhi coordinates
      zoom: 11
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add bus stops when map loads
    map.current.on('load', () => {
      if (!map.current) return;

      // Add bus stops
      if (busStops.length > 0) {
        map.current.addSource('bus-stops', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: busStops.map(stop => ({
              type: 'Feature',
              properties: {
                name: stop.name,
                id: stop.id
              },
              geometry: {
                type: 'Point',
                coordinates: [stop.lon, stop.lat]
              }
            }))
          }
        });

        map.current.addLayer({
          id: 'bus-stops',
          type: 'circle',
          source: 'bus-stops',
          paint: {
            'circle-radius': 4,
            'circle-color': '#3b82f6',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
      }

      // Add bus routes
      if (busRoutes.length > 0) {
        busRoutes.forEach((route, index) => {
          if (route.coordinates && route.coordinates.length > 0) {
            map.current?.addSource(`route-${index}`, {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {
                  name: route.name || `Route ${index + 1}`,
                  id: route.id || `route-${index}`
                },
                geometry: {
                  type: 'LineString',
                  coordinates: route.coordinates
                }
              }
            });

            map.current?.addLayer({
              id: `route-${index}`,
              type: 'line',
              source: `route-${index}`,
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#10b981',
                'line-width': 3,
                'line-opacity': 0.7
              }
            });
          }
        });
      }
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [mapboxToken, busStops, busRoutes]);

  // Update bus markers
  useEffect(() => {
    if (!map.current || liveBusData.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for each bus
    liveBusData.forEach(bus => {
      const el = document.createElement('div');
      el.className = 'bus-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      
      // Color based on status
      switch (bus.status) {
        case 'on-route':
          el.style.backgroundColor = '#10b981';
          break;
        case 'charging':
          el.style.backgroundColor = '#3b82f6';
          break;
        case 'maintenance':
          el.style.backgroundColor = '#f59e0b';
          break;
        default:
          el.style.backgroundColor = '#6b7280';
      }

      const marker = new mapboxgl.Marker(el)
        .setLngLat([bus.currentLocation.lon, bus.currentLocation.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${bus.name}</h3>
                <p><strong>Route:</strong> ${bus.route}</p>
                <p><strong>Driver:</strong> ${bus.driver}</p>
                <p><strong>Status:</strong> ${bus.status}</p>
                <p><strong>Battery:</strong> ${bus.batteryLevel}%</p>
                <p><strong>Passengers:</strong> ${bus.passengers.current}/${bus.passengers.capacity}</p>
                <p><strong>Speed:</strong> ${bus.currentLocation.speed} km/h</p>
                <p><strong>Next Stop:</strong> ${bus.schedule.nextStop}</p>
                <p><strong>ETA:</strong> ${bus.schedule.eta} min</p>
              </div>
            `)
        )
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [liveBusData]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
        <h4 className="font-medium text-sm mb-2">Bus Status</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>On Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Charging</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>Idle</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
        <div className="text-sm">
          <div><strong>Live Buses:</strong> {liveBusData.length}</div>
          <div><strong>Bus Stops:</strong> {busStops.length}</div>
          <div><strong>Routes:</strong> {busRoutes.length}</div>
        </div>
      </div>
    </div>
  );
};
