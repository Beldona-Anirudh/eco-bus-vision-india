
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Settings, BellIcon, UserRound, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { toast } = useToast();
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const toggleRole = () => {
    const newRole = role === 'user' ? 'admin' : 'user';
    setRole(newRole);
    toast({
      title: "Role Changed",
      description: `You are now logged in as ${newRole}`,
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 dark:bg-gray-900 dark:border-gray-800">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Eco Bus Vision India</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Energy Optimization System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>
                    {role === 'admin' ? 'AD' : 'US'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                <span>My Account</span> 
                <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300">
                  {role === 'admin' ? 'Admin' : 'User'}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleRole} className="cursor-pointer">
                {role === 'user' ? (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Switch to Admin</span>
                  </>
                ) : (
                  <>
                    <UserRound className="mr-2 h-4 w-4" />
                    <span>Switch to User</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
