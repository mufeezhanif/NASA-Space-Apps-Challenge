/**
 * Pollutant Cards Component
 * Displays the 5 key pollutants (NO2, HCHO, AI, PM, O3) in a clean, minimalist design
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wind, 
  Droplets, 
  Cloud, 
  Activity, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface PollutantData {
  name: string;
  shortName: string;
  value: number;
  unit: string;
  level: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
  trend: 'up' | 'down' | 'stable';
  source: 'satellite' | 'ground' | 'both';
  description: string;
  icon: any;
  color: string;
  maxSafeLevel: number;
  sparklineData: number[];
}

const pollutants: PollutantData[] = [
  {
    name: 'Nitrogen Dioxide',
    shortName: 'NO₂',
    value: 2.5,
    unit: '×10¹⁵ mol/cm²',
    level: 'moderate',
    trend: 'down',
    source: 'satellite',
    description: 'Traffic and industrial emissions',
    icon: Wind,
    color: 'blue',
    maxSafeLevel: 5.0,
    sparklineData: [2.8, 2.9, 2.7, 2.6, 2.5, 2.5, 2.4, 2.5]
  },
  {
    name: 'Formaldehyde',
    shortName: 'HCHO',
    value: 8.5,
    unit: '×10¹⁵ mol/cm²',
    level: 'good',
    trend: 'stable',
    source: 'satellite',
    description: 'Biogenic and anthropogenic VOCs',
    icon: Droplets,
    color: 'green',
    maxSafeLevel: 15.0,
    sparklineData: [8.3, 8.4, 8.5, 8.6, 8.5, 8.4, 8.5, 8.5]
  },
  {
    name: 'Aerosol Index',
    shortName: 'AI',
    value: 1.2,
    unit: 'unitless',
    level: 'good',
    trend: 'up',
    source: 'satellite',
    description: 'UV-absorbing aerosols (dust, smoke)',
    icon: Cloud,
    color: 'purple',
    maxSafeLevel: 3.0,
    sparklineData: [0.9, 1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 1.2]
  },
  {
    name: 'Particulate Matter',
    shortName: 'PM₂.₅',
    value: 12.5,
    unit: 'µg/m³',
    level: 'good',
    trend: 'stable',
    source: 'ground',
    description: 'Fine particles in the air',
    icon: Activity,
    color: 'orange',
    maxSafeLevel: 35.0,
    sparklineData: [13.2, 12.8, 12.5, 12.3, 12.5, 12.6, 12.4, 12.5]
  },
  {
    name: 'Ozone',
    shortName: 'O₃',
    value: 45.2,
    unit: 'DU',
    level: 'moderate',
    trend: 'up',
    source: 'both',
    description: 'Tropospheric ozone levels',
    icon: Wind,
    color: 'indigo',
    maxSafeLevel: 60.0,
    sparklineData: [42.0, 43.5, 44.0, 44.5, 45.0, 45.2, 45.5, 45.2]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'good':
      return 'bg-green-50 border-green-200 text-green-700';
    case 'moderate':
      return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'unhealthy':
      return 'bg-orange-50 border-orange-200 text-orange-700';
    case 'hazardous':
      return 'bg-red-50 border-red-200 text-red-700';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const getLevelBadge = (level: string) => {
  switch (level) {
    case 'good':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'moderate':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'unhealthy':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'hazardous':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-orange-600" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-green-600" />;
    default:
      return <Minus className="w-4 h-4 text-gray-600" />;
  }
};

const getSourceBadge = (source: string) => {
  switch (source) {
    case 'satellite':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'ground':
      return 'bg-green-50 text-green-600 border-green-200';
    case 'both':
      return 'bg-purple-50 text-purple-600 border-purple-200';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

export default function PollutantCards() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Key Pollutants</h2>
          <p className="text-gray-600 text-sm mt-1">Real-time monitoring of 5 critical air quality indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pollutants.map((pollutant) => {
          const Icon = pollutant.icon;
          const percentage = (pollutant.value / pollutant.maxSafeLevel) * 100;
          
          return (
            <Card 
              key={pollutant.shortName} 
              className={`border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${getLevelColor(pollutant.level)}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${pollutant.level === 'good' ? 'bg-green-100' : pollutant.level === 'moderate' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                      <Icon className={`w-5 h-5 ${pollutant.level === 'good' ? 'text-green-600' : pollutant.level === 'moderate' ? 'text-blue-600' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{pollutant.shortName}</h3>
                      <p className="text-xs text-gray-600">{pollutant.name}</p>
                    </div>
                  </div>
                  {getTrendIcon(pollutant.trend)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Value Display */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{pollutant.value}</span>
                    <span className="text-sm text-gray-600 ml-2">{pollutant.unit}</span>
                  </div>
                  <Badge className={`${getLevelBadge(pollutant.level)} border text-xs font-medium`}>
                    {pollutant.level.toUpperCase()}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Safe: 0</span>
                    <span>Max: {pollutant.maxSafeLevel}</span>
                  </div>
                </div>

                {/* Sparkline Chart */}
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pollutant.sparklineData.map((value, index) => ({ value, index }))}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={pollutant.level === 'good' ? '#10b981' : pollutant.level === 'moderate' ? '#3b82f6' : '#f97316'}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Source and Description */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <Badge className={`${getSourceBadge(pollutant.source)} border text-xs`}>
                      {pollutant.source === 'satellite' ? '🛰️ Satellite' : pollutant.source === 'ground' ? '📍 Ground' : '🔄 Both'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{pollutant.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">NASA TEMPO Mission Data</h4>
              <p className="text-sm text-blue-800">
                Real-time satellite measurements from NASA's TEMPO (Tropospheric Emissions: Monitoring of Pollution) 
                mission combined with ground-based monitoring stations for comprehensive air quality assessment.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="bg-white text-blue-700 border-blue-300 text-xs">Hourly Updates</Badge>
                <Badge className="bg-white text-blue-700 border-blue-300 text-xs">4.4km Resolution</Badge>
                <Badge className="bg-white text-blue-700 border-blue-300 text-xs">North America Coverage</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
