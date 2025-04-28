
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface BusLocationMapProps {
  mapboxToken: string;
}

export const BusLocationMap: React.FC<BusLocationMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const { busLocations, averageSpeed, busUtilization } = useRealTimeData();

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

    return () => {
      map.current?.remove();
      Object.values(markersRef.current).forEach(marker => marker.remove());
    };
  }, [mapboxToken]);

  // Update bus markers
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    busLocations.forEach(bus => {
      const el = document.createElement('div');
      el.className = 'bus-marker';
      el.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 5h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
            <path d="M5 11h14"></path>
            <path d="M7 14h.01"></path>
            <path d="M17 14h.01"></path>
          </svg>
        </div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat(bus.location)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <div class="font-bold">Bus ${bus.id}</div>
                <div>Speed: ${bus.speed.toFixed(1)} km/h</div>
              </div>
            `)
        )
        .addTo(map.current!);

      markersRef.current[bus.id] = marker;
    });
  }, [busLocations]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Delhi Bus Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div ref={mapContainer} className="h-[500px] rounded-md border border-border" />
          </div>
          <div>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{busLocations.length}</div>
                  <div className="text-sm text-muted-foreground">Active Buses</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{averageSpeed.toFixed(1)} km/h</div>
                  <div className="text-sm text-muted-foreground">Average Speed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{busUtilization.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Fleet Utilization</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
