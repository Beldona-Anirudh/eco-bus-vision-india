
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useTheme } from '@/hooks/useTheme';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Settings, 
  Sun, 
  Moon, 
  Text,
  Palette,
  SlidersHorizontal
} from 'lucide-react';
import { toast } from "sonner";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [font, setFont] = useState('inter');
  const [iconSize, setIconSize] = useState('medium');

  // Apply font to document
  useEffect(() => {
    document.body.classList.remove('font-inter', 'font-roboto', 'font-poppins');
    document.body.classList.add(`font-${font}`);
  }, [font]);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleFontChange = (value: string) => {
    setFont(value);
    toast.success(`Font changed to ${value}`);
  };

  const handleIconSizeChange = (value: string) => {
    setIconSize(value);
    document.documentElement.style.setProperty('--icon-size', 
      value === 'small' ? '16px' : value === 'medium' ? '20px' : '24px');
    toast.success(`Icon size changed to ${value}`);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and account settings.</p>
      </div>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="interface" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Interface
          </TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Choose between light and dark mode.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="theme-toggle">Light / Dark Mode</Label>
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Switch 
                    id="theme-toggle" 
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeChange}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Font Family</CardTitle>
                <CardDescription>
                  Select your preferred font for the interface.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="font-select">Select Font</Label>
                  <Select value={font} onValueChange={handleFontChange}>
                    <SelectTrigger id="font-select" className="w-full">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter (Default)</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="p-4 border rounded-md mt-2">
                    <p className={`font-${font} text-base`}>Sample Text - The quick brown fox jumps over the lazy dog.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Icons</CardTitle>
                <CardDescription>
                  Customize the icon size throughout the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Label>Icon Size</Label>
                  <RadioGroup value={iconSize} onValueChange={handleIconSizeChange} className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="icon-small" />
                      <Label htmlFor="icon-small" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" /> Small
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="icon-medium" />
                      <Label htmlFor="icon-medium" className="flex items-center">
                        <Settings className="h-5 w-5 mr-2" /> Medium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="icon-large" />
                      <Label htmlFor="icon-large" className="flex items-center">
                        <Settings className="h-6 w-6 mr-2" /> Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Color Intensity</CardTitle>
                <CardDescription>
                  Adjust the accent color intensity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Label>UI Color Intensity</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {[100, 200, 300, 400, 500].map((intensity) => (
                      <div 
                        key={intensity} 
                        className={`h-12 rounded-md bg-eco-blue-${intensity} cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all`}
                        onClick={() => {
                          document.documentElement.style.setProperty('--accent-intensity', intensity.toString());
                          toast.success(`Color intensity set to ${intensity}`);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="interface">
          <Card>
            <CardHeader>
              <CardTitle>Interface Settings</CardTitle>
              <CardDescription>
                Configure how the dashboard interface appears and functions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dense-mode">Dense Mode</Label>
                  <p className="text-sm text-muted-foreground">Compact layout with less whitespace</p>
                </div>
                <Switch id="dense-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Interface Animations</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable UI animations</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autosave">Auto-save Changes</Label>
                  <p className="text-sm text-muted-foreground">Automatically save form changes</p>
                </div>
                <Switch id="autosave" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how you receive notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifs">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifs">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">In-app notifications</p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alert-sound">Alert Sounds</Label>
                  <p className="text-sm text-muted-foreground">Play sound for important alerts</p>
                </div>
                <Switch id="alert-sound" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
