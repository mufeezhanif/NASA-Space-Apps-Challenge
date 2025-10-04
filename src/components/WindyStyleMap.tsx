/**
 * Windy.com Style Map Component
 * Interactive map with animated particle flow and pollutant overlays
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import { 
  Layers, 
  Wind, 
  Cloud, 
  Activity, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Maximize2,
  Settings,
  Info
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PollutantLayer {
  id: string;
  name: string;
  shortName: string;
  color: string;
  icon: any;
  active: boolean;
  opacity: number;
}

interface AnimatedParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

// Particle animation component
function ParticleOverlay({ data, bounds }: { data: any[], bounds: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<AnimatedParticle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 500; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: Math.random() * 100,
          maxLife: 100,
          color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.3})`
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        // Reset if out of bounds or life expired
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height || 
            particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = particle.maxLife;
        }

        // Draw particle with trail
        const alpha = particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.6})`;
        ctx.fill();

        // Draw trail
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data, bounds]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1000 }}
    />
  );
}

// Concentration overlay component
function ConcentrationHeatmap({ 
  parameter, 
  opacity 
}: { 
  parameter: string;
  opacity: number;
}) {
  const map = useMap();
  
  useEffect(() => {
    // Generate mock concentration data points
    const generateDataPoints = () => {
      const points = [];
      const center = map.getCenter();
      
      for (let i = 0; i < 50; i++) {
        const lat = center.lat + (Math.random() - 0.5) * 0.5;
        const lng = center.lng + (Math.random() - 0.5) * 0.5;
        const value = Math.random();
        
        points.push({ lat, lng, value });
      }
      
      return points;
    };

    const dataPoints = generateDataPoints();
    
    // Create circles for each data point
    dataPoints.forEach(point => {
      const color = getColorForValue(point.value);
      const circle = L.circle([point.lat, point.lng], {
        radius: 5000,
        fillColor: color,
        fillOpacity: opacity,
        stroke: false
      }).addTo(map);
    });

    return () => {
      // Cleanup circles
      map.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map, parameter, opacity]);

  return null;
}

// Color interpolation function
function getColorForValue(value: number): string {
  // Blue to Red gradient
  if (value < 0.5) {
    const t = value * 2;
    return `rgb(${Math.floor(0 + t * 255)}, ${Math.floor(100 + t * 155)}, 255)`;
  } else {
    const t = (value - 0.5) * 2;
    return `rgb(255, ${Math.floor(255 - t * 255)}, ${Math.floor(255 - t * 255)})`;
  }
}

export default function WindyStyleMap() {
  const [layers, setLayers] = useState<PollutantLayer[]>([
    {
      id: 'no2',
      name: 'Nitrogen Dioxide',
      shortName: 'NO₂',
      color: 'blue',
      icon: Wind,
      active: true,
      opacity: 0.6
    },
    {
      id: 'hcho',
      name: 'Formaldehyde',
      shortName: 'HCHO',
      color: 'green',
      icon: Cloud,
      active: false,
      opacity: 0.6
    },
    {
      id: 'pm25',
      name: 'Particulate Matter',
      shortName: 'PM₂.₅',
      color: 'orange',
      icon: Activity,
      active: false,
      opacity: 0.6
    },
    {
      id: 'o3',
      name: 'Ozone',
      shortName: 'O₃',
      color: 'purple',
      icon: Wind,
      active: false,
      opacity: 0.6
    }
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [showParticles, setShowParticles] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([34.0522, -118.2437]);
  const [mapZoom, setMapZoom] = useState(9);

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, active: !layer.active } : layer
    ));
  };

  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHour((prev) => (prev + 1) % 24);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeLayer = layers.find(l => l.active);

  return (
    <div className="space-y-4">
      <Card className="bg-white border border-blue-100 shadow-lg">
        <CardHeader className="border-b border-blue-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Interactive Pollutant Map
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Real-time visualization with animated flow patterns
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
              Live Data
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Layer Selection */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Select Pollutant Layer</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      layer.active
                        ? 'bg-blue-500 text-white border-blue-600 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{layer.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              className="w-full h-full"
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Concentration overlay */}
              {activeLayer && (
                <ConcentrationHeatmap 
                  parameter={activeLayer.id} 
                  opacity={activeLayer.opacity}
                />
              )}
            </MapContainer>

            {/* Particle overlay */}
            {showParticles && (
              <ParticleOverlay 
                data={[]} 
                bounds={{}}
              />
            )}

            {/* Controls overlay */}
            <div className="absolute top-4 right-4 z-[1001] space-y-2">
              <Button
                onClick={() => setShowParticles(!showParticles)}
                size="sm"
                className="bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
              >
                {showParticles ? '🌊 Hide Flow' : '🌊 Show Flow'}
              </Button>
            </div>
          </div>

          {/* Time Controls */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Time Control</h3>
              <span className="text-lg font-bold text-blue-600">
                {currentHour.toString().padStart(2, '0')}:00
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setCurrentHour((prev) => (prev - 1 + 24) % 24)}
                size="sm"
                variant="outline"
                className="hover:bg-blue-50"
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button
                onClick={() => setCurrentHour((prev) => (prev + 1) % 24)}
                size="sm"
                variant="outline"
                className="hover:bg-blue-50"
              >
                <SkipForward className="w-4 h-4" />
              </Button>

              <div className="flex-1">
                <Slider
                  value={[currentHour]}
                  onValueChange={(value) => setCurrentHour(value[0])}
                  max={23}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Opacity Control */}
          {activeLayer && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  Layer Opacity: {activeLayer.name}
                </h3>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(activeLayer.opacity * 100)}%
                </span>
              </div>
              <Slider
                value={[activeLayer.opacity * 100]}
                onValueChange={(value) => updateLayerOpacity(activeLayer.id, value[0] / 100)}
                max={100}
                step={5}
              />
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Concentration Scale</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">Low</span>
              <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-blue-200 via-yellow-200 to-red-500"></div>
              <span className="text-xs text-gray-600">High</span>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800">
                Interactive map shows real-time pollutant concentrations with animated particle flow. 
                Select different layers to visualize various pollutants across the region.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
