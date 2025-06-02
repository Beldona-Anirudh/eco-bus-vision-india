
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLiveBusData } from '@/hooks/useLiveBusData';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface LiveBusMapProps {
  mapboxToken?: string;
  height?: string;
}

export const LiveBusMap: React.FC<LiveBusMapProps> = ({ 
  mapboxToken, 
  height = '600px' 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [isLiveMode, setIsLiveMode] = useState(true);
  
  const { liveBusData, fleetStats, busStops, busRoutes, isLiveUpdating } = useLiveBusData();

  // Delhi center coordinates
  const delhiCenter = { lat: 28.7041, lng: 77.1025 };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [delhiCenter.lng, delhiCenter.lat],
      zoom: 11
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add bus stops layer
    map.current.on('load', () => {
      // Add bus stops as data source
      map.current?.addSource('bus-stops', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: busStops.map(stop => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [stop.lon, stop.lat]
            },
            properties: {
              id: stop.id,
              name: stop.name,
              operator: stop.operator,
              wheelchair: stop.wheelchair,
              shelter: stop.shelter
            }
          }))
        }
      });

      // Add bus stops layer
      map.current?.addLayer({
        id: 'bus-stops',
        type: 'circle',
        source: 'bus-stops',
        paint: {
          'circle-radius': 6,
          'circle-color': '#3b82f6',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Add bus routes if available
      busRoutes.forEach((route, index) => {
        // This would normally use actual route geometry from OSM
        // For now, we'll create simple lines between random stops
        const routeStops = busStops.slice(index * 2, (index * 2) + 2);
        if (routeStops.length >= 2) {
          map.current?.addSource(`route-${route.id}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: routeStops.map(stop => [stop.lon, stop.lat])
              }
            }
          });

          map.current?.addLayer({
            id: `route-${route.id}`,
            type: 'line',
            source: `route-${route.id}`,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': route.colour || '#0ea5e9',
              'line-width': 3,
              'line-opacity': 0.7
            }
          });
        }
      });
    });

    return () => {
      map.current?.remove();
      Object.values(markersRef.current).forEach(marker => marker.remove());
    };
  }, [mapboxToken, busStops, busRoutes]);

  // Update bus markers
  useEffect(() => {
    if (!map.current || !isLiveMode) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    liveBusData.forEach(bus => {
      const el = document.createElement('div');
      el.className = 'bus-marker';
      
      const statusColors = {
        'on-route': '#10b981',
        'charging': '#3b82f6',
        'maintenance': '#f59e0b',
        'idle': '#6b7280'
      };

      el.innerHTML = `
        <div class="relative">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white" 
               style="background-color: ${statusColors[bus.status]}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M8 5h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
              <path d="M5 11h14"></path>
              <path d="M7 14h.01"></path>
              <path d="M17 14h.01"></path>
            </svg>
          </div>
          <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold">
            ${Math.round(bus.batteryLevel / 10)}
          </div>
        </div>
      `;

      const popupContent = `
        <div class="p-3 min-w-64">
          <div class="font-bold text-lg mb-2">${bus.name}</div>
          <div class="space-y-1 text-sm">
            <div><strong>Route:</strong> ${bus.routeName}</div>
            <div><strong>Driver:</strong> ${bus.driver}</div>
            <div><strong>Status:</strong> <span class="capitalize">${bus.status.replace('-', ' ')}</span></div>
            <div><strong>Battery:</strong> ${bus.batteryLevel}% (${bus.estimatedRange} km range)</div>
            <div><strong>Speed:</strong> ${bus.currentLocation.speed} km/h</div>
            <div><strong>Passengers:</strong> ${bus.passengers.current}/${bus.passengers.capacity}</div>
            <div><strong>Next Stop:</strong> ${bus.schedule.nextStop} (${bus.schedule.eta} min)</div>
          </div>
        </div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([bus.currentLocation.lon, bus.currentLocation.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
        .addTo(map.current!);

      markersRef.current[bus.id] = marker;
    });
  }, [liveBusData, isLiveMode]);

  if (!mapboxToken) {
    return (
      <Card style={{ height }}>
        <CardHeader>
          <CardTitle>Live Bus Tracking Map</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Mapbox token required to display live map
            </p>
            <p className="text-sm text-muted-foreground">
              Please add your Mapbox token in the Map page settings
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{ height }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Live Bus Tracking</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isLiveUpdating ? "default" : "secondary"}>
              {isLiveUpdating ? 'Live' : 'Paused'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiveMode(!isLiveMode)}
            >
              {isLiveMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-3">
            <div ref={mapContainer} className="w-full rounded-md border border-border" style={{ height: '500px' }} />
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{fleetStats.activeBuses}</div>
                <div className="text-sm text-muted-foreground">Active Buses</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{fleetStats.chargingBuses}</div>
                <div className="text-sm text-muted-foreground">Charging</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{fleetStats.averageSpeed.toFixed(1)} km/h</div>
                <div className="text-sm text-muted-foreground">Avg Speed</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{fleetStats.totalPassengers}</div>
                <div className="text-sm text-muted-foreground">Total Passengers</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
