
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { busesData, routeDetails } from '../../data/mockData';

interface BusLocationMapProps {
  mapboxToken: string;
}

interface BusLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routeId: string;
  batteryLevel: number;
  passengers: number;
  capacity: number;
  type: 'ac' | 'non-ac';
}

export const BusLocationMap: React.FC<BusLocationMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);
  const [simulatedBusLocations, setSimulatedBusLocations] = useState<BusLocation[]>([]);

  // Mumbai center coordinates
  const mumbaiCenter = { lat: 19.0760, lng: 72.8777 };

  // Generate random locations around Mumbai for buses
  useEffect(() => {
    const activeBuses = busesData.filter(bus => bus.status === 'on-route');
    
    // Create simulated locations for active buses
    const locations = activeBuses.map(bus => {
      // Get a random route for this bus
      const randomRouteIndex = Math.floor(Math.random() * routeDetails.length);
      const route = routeDetails[randomRouteIndex];
      
      // Create a location with some random offset from Mumbai center
      return {
        id: bus.id,
        name: bus.name,
        lat: mumbaiCenter.lat + (Math.random() - 0.5) * 0.1,
        lng: mumbaiCenter.lng + (Math.random() - 0.5) * 0.1,
        routeId: route.id,
        batteryLevel: bus.batteryLevel,
        passengers: Math.floor(Math.random() * bus.capacity),
        capacity: bus.capacity,
        type: bus.type
      };
    });
    
    setSimulatedBusLocations(locations);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !simulatedBusLocations.length) return;

    mapboxgl.accessToken = mapboxToken;
    
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mumbaiCenter.lng, mumbaiCenter.lat],
      zoom: 12
    });

    map.current = mapInstance;

    // Add navigation controls
    mapInstance.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Wait for map to load before adding markers
    mapInstance.on('load', () => {
      // Add bus markers
      simulatedBusLocations.forEach(bus => {
        // Create custom element for marker
        const el = document.createElement('div');
        el.className = 'bus-marker';
        el.innerHTML = `
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs" 
               style="background-color: ${bus.type === 'ac' ? '#3b82f6' : '#10b981'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 6v12"></path>
              <path d="M15 6v12"></path>
              <path d="M5 16h14"></path>
              <path d="M19 21v-5H5v5"></path>
              <path d="M3 6h18v5H3z"></path>
              <path d="m9 3-2 3"></path>
              <path d="m17 3 2 3"></path>
            </svg>
          </div>
        `;
        
        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([bus.lng, bus.lat])
          .addTo(mapInstance);
        
        // Add click event
        el.addEventListener('click', () => {
          setSelectedBus(bus);
        });
        
        // Store marker reference
        markersRef.current[bus.id] = marker;
      });

      // Simulate bus movement every 3 seconds
      const interval = setInterval(() => {
        setSimulatedBusLocations(prev => {
          const updated = prev.map(bus => ({
            ...bus,
            lat: bus.lat + (Math.random() - 0.5) * 0.002,
            lng: bus.lng + (Math.random() - 0.5) * 0.002,
            batteryLevel: Math.max(1, Math.min(100, bus.batteryLevel + (Math.random() - 0.7))),
            passengers: Math.min(bus.capacity, Math.max(0, bus.passengers + Math.floor((Math.random() - 0.5) * 5)))
          }));
          
          // Update marker positions
          updated.forEach(bus => {
            const marker = markersRef.current[bus.id];
            if (marker) {
              marker.setLngLat([bus.lng, bus.lat]);
            }
          });
          
          // Update selected bus if one is selected
          if (selectedBus) {
            const updatedBus = updated.find(b => b.id === selectedBus.id);
            if (updatedBus) {
              setSelectedBus(updatedBus);
            }
          }
          
          return updated;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    });

    // Cleanup
    return () => {
      mapInstance.remove();
      Object.values(markersRef.current).forEach(marker => marker.remove());
    };
  }, [mapboxToken, simulatedBusLocations.length]);

  const getRouteInfo = (routeId: string) => {
    return routeDetails.find(route => route.id === routeId);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Live Bus Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div ref={mapContainer} className="h-[500px] rounded-md border border-border" />
          </div>
          <div>
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium mb-2">Bus Information</h3>
              
              {selectedBus ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{selectedBus.name}</span>
                    <Badge variant="outline">{selectedBus.type === 'ac' ? 'AC' : 'Non-AC'}</Badge>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Route</div>
                    <div className="font-medium">{getRouteInfo(selectedBus.routeId)?.name || 'Unknown'}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Battery Level</div>
                    <div className="flex items-center">
                      <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-full rounded-full ${
                            selectedBus.batteryLevel < 20 
                              ? 'bg-eco-orange-500' 
                              : selectedBus.batteryLevel > 80 
                                ? 'bg-eco-green-500' 
                                : 'bg-eco-blue-500'
                          }`}
                          style={{ width: `${selectedBus.batteryLevel}%` }}
                        />
                      </div>
                      <span>{Math.round(selectedBus.batteryLevel)}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Passengers</div>
                    <div className="font-medium">
                      {selectedBus.passengers} / {selectedBus.capacity} 
                      <span className="text-sm text-muted-foreground ml-1">
                        ({Math.round((selectedBus.passengers / selectedBus.capacity) * 100)}% full)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className={`h-full rounded-full ${
                          selectedBus.passengers / selectedBus.capacity > 0.8
                            ? 'bg-eco-orange-500'
                            : 'bg-eco-blue-500'
                        }`}
                        style={{ width: `${(selectedBus.passengers / selectedBus.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Current Location</div>
                    <div className="font-medium">
                      {selectedBus.lat.toFixed(4)}, {selectedBus.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Select a bus on the map to view details
                </div>
              )}
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Active Buses</h3>
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {simulatedBusLocations.map(bus => (
                  <div 
                    key={bus.id}
                    onClick={() => setSelectedBus(bus)}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      selectedBus?.id === bus.id ? 'bg-accent' : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          bus.batteryLevel < 20 ? 'bg-eco-orange-500' : 'bg-eco-green-500'
                        }`}
                      />
                      <span>{bus.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(bus.batteryLevel)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
