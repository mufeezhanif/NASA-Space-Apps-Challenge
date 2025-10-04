import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, MapPin, Bell, Database, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { value: 'dashboard', label: 'Dashboard', icon: Activity },
  { value: 'map', label: 'Map', icon: MapPin },
  { value: 'alerts', label: 'Alerts', icon: Bell },
  { value: 'trends', label: 'Data Analysis', icon: Database },
  { value: 'settings', label: 'Settings', icon: Settings },
];

export default function NavigationDrawer({ isOpen, onClose, activeTab, onTabChange }: NavigationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 glass-strong z-50 shadow-2xl border-l border-white/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Navigation</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-6 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.value;
                
                return (
                  <motion.button
                    key={item.value}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onTabChange(item.value);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 shadow-lg glow-primary'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-600' 
                        : 'bg-white/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                    </div>
                    <span className={`font-medium ${
                      isActive ? 'text-white' : 'text-gray-300'
                    }`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <div className="text-xs text-gray-400 space-y-1">
                <p>AirWatch Pro v2.0</p>
                <p className="text-gray-500">AI-Powered Air Quality Monitoring</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
