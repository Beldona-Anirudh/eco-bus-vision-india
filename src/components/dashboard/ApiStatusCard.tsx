
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { checkApiStatus } from '../../services/apiService';
import { useToast } from "@/hooks/use-toast";

export const ApiStatusCard: React.FC = () => {
  const [apiStatus, setApiStatus] = useState({ weather: false, countries: false, osm: false });
  const [weatherApiKey, setWeatherApiKey] = useState(() => 
    localStorage.getItem('openweather_api_key') || ''
  );
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const checkStatus = async () => {
    setIsChecking(true);
    try {
      const status = await checkApiStatus();
      setApiStatus(status);
    } catch (error) {
      console.error('Failed to check API status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const saveWeatherApiKey = () => {
    if (weatherApiKey.trim()) {
      localStorage.setItem('openweather_api_key', weatherApiKey.trim());
      toast({
        title: "API Key Saved",
        description: "OpenWeatherMap API key has been saved locally",
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const StatusIcon = ({ status }: { status: boolean }) => {
    return status ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          API Integrations
          <Button variant="outline" size="sm" onClick={checkStatus} disabled={isChecking}>
            {isChecking ? 'Checking...' : 'Refresh'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={apiStatus.weather} />
              <span>OpenWeatherMap</span>
            </div>
            <Badge variant={apiStatus.weather ? "default" : "secondary"}>
              {apiStatus.weather ? 'Connected' : 'Demo Mode'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={apiStatus.countries} />
              <span>REST Countries</span>
            </div>
            <Badge variant={apiStatus.countries ? "default" : "secondary"}>
              {apiStatus.countries ? 'Active' : 'Offline'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={apiStatus.osm} />
              <span>OpenStreetMap</span>
            </div>
            <Badge variant={apiStatus.osm ? "default" : "secondary"}>
              {apiStatus.osm ? 'Active' : 'Offline'}
            </Badge>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Weather API Setup
          </h4>
          <p className="text-xs text-muted-foreground mb-2">
            Get a free API key from OpenWeatherMap for live weather data
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter OpenWeatherMap API key"
              value={weatherApiKey}
              onChange={(e) => setWeatherApiKey(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={saveWeatherApiKey}>Save</Button>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <ExternalLink className="h-3 w-3" />
            <a 
              href="https://openweathermap.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              Get free API key (1,000 calls/day)
            </a>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>✓ REST Countries API - Completely free</p>
          <p>✓ OpenStreetMap API - Completely free</p>
          <p>✓ Weather data falls back to demo mode if API unavailable</p>
        </div>
      </CardContent>
    </Card>
  );
};
