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
import NavigationDrawer from '@/components/NavigationDrawer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { MapPin, Settings, Wind, Menu, Sparkles } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { location } = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation Drawer */}
      <NavigationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="min-h-screen">
        {/* Glassmorphism Navbar */}
        <motion.div 
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            scrollY > 50 ? 'glass-strong shadow-2xl' : 'glass'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg glow-primary"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(0, 191, 255, 0.3)',
                        '0 0 30px rgba(138, 43, 226, 0.4)',
                        '0 0 20px rgba(0, 191, 255, 0.3)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Wind className="w-7 h-7 text-white" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold ai-gradient-text">
                    AirWatch Pro
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI-Powered Monitoring
                  </p>
                </div>
              </motion.div>

              {/* Right Side Controls */}
              <div className="flex items-center space-x-3">
                {/* Location Badge */}
                <motion.div 
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 glass rounded-xl border border-cyan-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white max-w-48 truncate">
                    {location.locationName}
                  </span>
                </motion.div>

                {/* Live Indicator */}
                <motion.div 
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 glass rounded-xl border border-green-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-green-400">Live</span>
                </motion.div>

                {/* Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDrawerOpen(true)}
                  className="p-3 glass-strong rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <Menu className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Section with Particles Effect */}
        <div className="pt-24 px-4 sm:px-6 pb-12 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </div>

          <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-6 py-3 glass-strong rounded-full border border-cyan-500/30 mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">NASA TEMPO Satellite • Real-time Data</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Experience the Future of
                <span className="block ai-gradient-text mt-2">Air Quality Monitoring</span>
              </h2>
              
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Advanced AI-powered analytics tracking NO₂, HCHO, Aerosol Index, and more with 
                unprecedented precision and real-time insights
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Sections with Smooth Animations */}
        <div className="px-4 sm:px-6 pb-24 lg:pb-8 max-w-7xl mx-auto">
          <TabsContent value="dashboard" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EnhancedDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="map" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ForecastMaps />
            </motion.div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PersonalizedAlerts />
            </motion.div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DataAnalysisDashboard />
            </motion.div>
          </TabsContent>

          <TabsContent value="sources" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DataSources />
            </motion.div>
          </TabsContent>

          <TabsContent value="alert-system" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AlertDistributionSystem />
            </motion.div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LocationSettings />
            </motion.div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}