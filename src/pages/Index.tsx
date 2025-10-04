import Dashboard from '@/components/Dashboard';
import AirQualityMap from '@/components/AirQualityMap';
import AlertsPanel from '@/components/AlertsPanel';
import HistoricalTrends from '@/components/HistoricalTrends';
import LocationSettings from '@/components/LocationSettings';
import DataSources from '@/components/DataSources';
import EnhancedDashboard from '@/components/EnhancedDashboard';
import ForecastMaps from '@/components/ForecastMaps';
import PersonalizedAlerts from '@/components/PersonalizedAlerts';
import AlertDistributionSystem from '@/components/AlertDistributionSystem';
import DataAnalysisDashboard from '@/components/DataAnalysisDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, TrendingUp, Settings, Bell, Activity, Database, Wind, Waves, AlertTriangle } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';
import { useState } from 'react';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { location } = useLocation();
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* AirWatch Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    AirWatch Pro
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Real-Time Air Quality Monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Location Name Badge */}
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 max-w-48 truncate">
                    {location.locationName}
                  </span>
                </div>
                
                {/* Mobile Location Badge */}
                <div className="sm:hidden flex items-center space-x-1 px-2 py-1 bg-blue-50 rounded-lg border border-blue-200">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700 max-w-24 truncate">
                    {location.locationName.split(',')[0]}
                  </span>
                </div>
                
                {/* Live Data Indicator */}
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">Live</span>
                </div>
                
                <button 
                  className="flex items-center justify-center p-2 rounded-lg transition-all duration-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block px-4 sm:px-6 py-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full text-blue-600 text-sm font-medium shadow-sm border border-blue-100">
              <Waves className="w-4 h-4" />
              <span>NASA TEMPO Satellite • Real-time Monitoring</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Monitor Air Quality in
              <span className="text-blue-600"> Real-Time</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Track NO₂, HCHO, Aerosol Index, Particulate Matter, and Ozone levels with precision satellite data
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-5 h-auto p-2 bg-white rounded-xl shadow-lg border border-blue-100 mb-8">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Map</span>
            </TabsTrigger>
            <TabsTrigger 
              value="alerts" 
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Alerts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trends" 
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Database className="w-5 h-5" />
              <span className="text-sm font-medium">Data Analysis</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content Sections */}
        <div className="px-4 sm:px-6 pb-24 lg:pb-8">
          <TabsContent value="dashboard" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <EnhancedDashboard />
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <ForecastMaps />
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <PersonalizedAlerts />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <DataAnalysisDashboard />
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <DataSources />
            </div>
          </TabsContent>

          <TabsContent value="alert-system" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <AlertDistributionSystem />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0 focus-visible:outline-none">
            <div className="animate-in fade-in-50 duration-300">
              <LocationSettings />
            </div>
          </TabsContent>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-white border-t border-blue-100 shadow-lg">
            <div className="px-2 py-2">
              <div className="overflow-x-auto">
                <TabsList className="grid w-max grid-cols-5 h-auto p-1 bg-transparent gap-1 min-w-full">
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md min-w-[70px]"
                  >
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-medium">Home</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="map" 
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md min-w-[70px]"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-medium">Map</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="alerts" 
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md min-w-[70px]"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="text-xs font-medium">Alerts</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trends" 
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md min-w-[70px]"
                  >
                    <Database className="w-4 h-4" />
                    <span className="text-xs font-medium">Analysis</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md min-w-[70px]"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-xs font-medium">Settings</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tabs>
  );
}