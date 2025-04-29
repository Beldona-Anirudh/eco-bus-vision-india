
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FleetPage from "./pages/FleetPage";
import RoutesPage from "./pages/RoutesPage";
import SchedulePage from "./pages/SchedulePage";
import BatteryPage from "./pages/BatteryPage";
import LocationsPage from "./pages/LocationsPage";
import RouteLocationsPage from "./pages/RouteLocationsPage";
import SettingsPage from "./pages/SettingsPage";
import MapPage from "./pages/MapPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/battery" element={<BatteryPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/route-locations" element={<RouteLocationsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
