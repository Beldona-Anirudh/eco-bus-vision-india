
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bus, 
  BarChart, 
  MapPin, 
  Calendar, 
  Settings, 
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Route
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: BarChart, href: '/' },
    { name: 'Fleet Overview', icon: Bus, href: '/fleet' },
    { name: 'Route Planner', icon: Route, href: '/routes' },
    { name: 'Battery Analytics', icon: BatteryCharging, href: '/battery' },
    { name: 'Locations', icon: MapPin, href: '/locations' },
    { name: 'Schedule', icon: Calendar, href: '/schedule' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div 
      className={cn(
        "bg-eco-blue-900 text-white flex flex-col h-full transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-eco-blue-700">
        <div className={cn("flex items-center space-x-3", !isOpen && "justify-center w-full")}>
          <Bus className="h-8 w-8 text-eco-green-400" />
          {isOpen && <span className="text-xl font-bold">Eco Bus</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn("text-white hover:bg-eco-blue-800", !isOpen && "hidden")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn("text-white hover:bg-eco-blue-800 absolute right-0 translate-x-1/2 top-10 bg-eco-blue-900 rounded-full border border-eco-blue-700", isOpen && "hidden")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-eco-blue-800 transition-colors",
                  item.href === '/' && "bg-eco-blue-800",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", item.href === '/' ? "text-eco-green-400" : "text-eco-blue-100")} />
                {isOpen && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-eco-blue-700">
        <div className={cn(
          "bg-eco-blue-800 p-3 rounded-md", 
          isOpen ? "text-sm" : "text-xs text-center"
        )}>
          {isOpen ? (
            <>
              <p>Need help?</p>
              <p className="text-eco-green-400">Contact support</p>
            </>
          ) : (
            <p>Help</p>
          )}
        </div>
      </div>
    </div>
  );
};
