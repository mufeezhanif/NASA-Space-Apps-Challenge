# API Requirements for Atmosphere Analyzer

## Overview
This document outlines the API endpoints and data requirements for the Atmosphere Analyzer application to provide comprehensive air quality monitoring for the NASA Space Apps Challenge.

## Required Pollutants (5 Key Parameters)

1. **Nitrogen Dioxide (NO₂)** - Tropospheric column
2. **Formaldehyde (HCHO/CH₂O)** - Tropospheric column
3. **Aerosol Index (AI)** - UV absorbing aerosol indicator
4. **Particulate Matter (PM)** - PM2.5 and PM10
5. **Ozone (O₃)** - Total column and tropospheric

---

## 1. NASA TEMPO API (Primary Satellite Data Source)

### Mission Overview
- **Satellite**: Geostationary orbit over North America
- **Coverage**: North America (15°N to 60°N, 140°W to 60°W)
- **Temporal Resolution**: Hourly measurements
- **Spatial Resolution**: 4.4 km × 4.4 km

### Required Endpoints

#### 1.1 NO₂ Column Data
```
Endpoint: /api/tempo/no2
Method: GET
Parameters:
  - latitude: float (-90 to 90)
  - longitude: float (-180 to 180)
  - timestamp: ISO 8601 datetime (optional, defaults to latest)
  - spatial_extent: object (optional, for regional data)
    {
      "north": float,
      "south": float,
      "east": float,
      "west": float
    }

Response:
{
  "timestamp": "2025-01-03T14:00:00Z",
  "coordinates": {
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "no2_column": {
    "value": 2.5e15,
    "unit": "molecules/cm²",
    "uncertainty": 0.15
  },
  "quality_flag": "good|moderate|poor",
  "cloud_fraction": 0.1,
  "viewing_angle": 45.2,
  "data_version": "v1.0"
}
```

#### 1.2 HCHO Column Data
```
Endpoint: /api/tempo/hcho
Method: GET
Parameters: (Same as NO₂)

Response:
{
  "timestamp": "2025-01-03T14:00:00Z",
  "coordinates": {...},
  "hcho_column": {
    "value": 8.5e15,
    "unit": "molecules/cm²",
    "uncertainty": 0.20
  },
  "quality_flag": "good|moderate|poor",
  "cloud_fraction": 0.1,
  "viewing_angle": 45.2
}
```

#### 1.3 Aerosol Index Data
```
Endpoint: /api/tempo/aerosol-index
Method: GET
Parameters: (Same as NO₂)

Response:
{
  "timestamp": "2025-01-03T14:00:00Z",
  "coordinates": {...},
  "aerosol_index": {
    "value": 1.2,
    "unit": "unitless",
    "uncertainty": 0.1
  },
  "aerosol_type": "dust|smoke|urban|mixed",
  "quality_flag": "good|moderate|poor"
}
```

#### 1.4 Ozone Column Data
```
Endpoint: /api/tempo/ozone
Method: GET
Parameters: (Same as NO₂)

Response:
{
  "timestamp": "2025-01-03T14:00:00Z",
  "coordinates": {...},
  "o3_total_column": {
    "value": 320.5,
    "unit": "Dobson Units (DU)"
  },
  "o3_tropospheric": {
    "value": 45.2,
    "unit": "DU"
  },
  "quality_flag": "good|moderate|poor"
}
```

#### 1.5 Multi-Parameter Query (Recommended for Efficiency)
```
Endpoint: /api/tempo/comprehensive
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - timestamp: ISO 8601 datetime (optional)
  - parameters: array ["no2", "hcho", "aerosol_index", "o3"]

Response:
{
  "timestamp": "2025-01-03T14:00:00Z",
  "coordinates": {...},
  "measurements": {
    "no2_column": {...},
    "hcho_column": {...},
    "aerosol_index": {...},
    "o3_total_column": {...},
    "o3_tropospheric": {...}
  },
  "quality_metrics": {
    "overall_quality": "good|moderate|poor",
    "cloud_fraction": 0.1,
    "viewing_angle": 45.2
  }
}
```

---

## 2. Ground Station Data APIs

### 2.1 EPA AirNow API (United States)

#### Real-time AQI and PM Data
```
Endpoint: /api/airnow/current
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - distance: integer (km, default: 25)
  - api_key: string

Response:
{
  "station_id": "EPA-CA-037-0004",
  "station_name": "Los Angeles-North Main Street",
  "coordinates": {...},
  "distance_km": 5.2,
  "timestamp": "2025-01-03T14:00:00Z",
  "parameters": {
    "pm25": {
      "value": 12.5,
      "unit": "µg/m³",
      "aqi": 52,
      "category": "Moderate"
    },
    "pm10": {
      "value": 25.3,
      "unit": "µg/m³",
      "aqi": 45,
      "category": "Good"
    },
    "o3": {
      "value": 0.042,
      "unit": "ppm",
      "aqi": 38,
      "category": "Good"
    },
    "no2": {
      "value": 35.2,
      "unit": "ppb",
      "aqi": 45
    }
  },
  "overall_aqi": 52,
  "primary_pollutant": "PM2.5"
}
```

### 2.2 OpenAQ API (Global Coverage)

#### Global Air Quality Data
```
Endpoint: /api/openaq/latest
Method: GET
Parameters:
  - coordinates: string "lat,lon"
  - radius: integer (meters, max: 25000)
  - parameters: array ["pm25", "pm10", "o3", "no2"]

Response:
{
  "results": [
    {
      "location": "Station Name",
      "city": "Los Angeles",
      "country": "US",
      "coordinates": {...},
      "measurements": [
        {
          "parameter": "pm25",
          "value": 12.5,
          "unit": "µg/m³",
          "lastUpdated": "2025-01-03T14:00:00Z"
        },
        {
          "parameter": "pm10",
          "value": 25.3,
          "unit": "µg/m³",
          "lastUpdated": "2025-01-03T14:00:00Z"
        }
      ]
    }
  ]
}
```

---

## 3. Weather Data API (Context Information)

### OpenWeatherMap API

#### Current Weather
```
Endpoint: /api/weather/current
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - api_key: string

Response:
{
  "coordinates": {...},
  "timestamp": "2025-01-03T14:00:00Z",
  "weather": {
    "temperature": 22.5,
    "temperature_unit": "°C",
    "humidity": 65,
    "pressure": 1013,
    "wind_speed": 3.5,
    "wind_direction": 180,
    "cloud_cover": 25,
    "visibility": 10000
  }
}
```

#### Weather Forecast (for prediction models)
```
Endpoint: /api/weather/forecast
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - hours: integer (default: 48, max: 120)
  - api_key: string

Response:
{
  "coordinates": {...},
  "forecast": [
    {
      "timestamp": "2025-01-03T15:00:00Z",
      "temperature": 23.0,
      "humidity": 63,
      "wind_speed": 4.0,
      "wind_direction": 185,
      "precipitation_probability": 0.1
    },
    ...
  ]
}
```

---

## 4. Historical Data APIs (For Trends & Analysis)

### 4.1 Historical TEMPO Data
```
Endpoint: /api/tempo/historical
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - start_date: ISO 8601 date
  - end_date: ISO 8601 date
  - parameter: string ("no2"|"hcho"|"aerosol_index"|"o3")
  - aggregation: string ("hourly"|"daily"|"weekly")

Response:
{
  "coordinates": {...},
  "parameter": "no2",
  "unit": "molecules/cm²",
  "aggregation": "daily",
  "data": [
    {
      "date": "2025-01-01",
      "value": 2.3e15,
      "min": 1.8e15,
      "max": 3.1e15,
      "std_dev": 0.3e15,
      "data_points": 24
    },
    ...
  ]
}
```

### 4.2 Historical Ground Station Data
```
Endpoint: /api/ground/historical
Method: GET
Parameters:
  - station_id: string
  - start_date: ISO 8601 date
  - end_date: ISO 8601 date
  - parameters: array ["pm25", "pm10", "o3", "no2"]

Response:
{
  "station_id": "EPA-CA-037-0004",
  "coordinates": {...},
  "data": [
    {
      "timestamp": "2025-01-01T00:00:00Z",
      "pm25": 15.2,
      "pm10": 28.5,
      "o3": 0.038,
      "no2": 32.1
    },
    ...
  ]
}
```

---

## 5. Forecasting API (Predictive Models)

### Air Quality Forecast
```
Endpoint: /api/forecast/air-quality
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - hours_ahead: integer (default: 48, max: 120)
  - parameters: array ["aqi", "pm25", "pm10", "o3", "no2"]

Response:
{
  "coordinates": {...},
  "model_version": "v2.0",
  "generated_at": "2025-01-03T14:00:00Z",
  "forecast": [
    {
      "timestamp": "2025-01-03T15:00:00Z",
      "aqi": 55,
      "confidence": 0.85,
      "parameters": {
        "pm25": {
          "value": 13.2,
          "unit": "µg/m³",
          "confidence_interval": [11.5, 15.0]
        },
        "pm10": {
          "value": 26.8,
          "unit": "µg/m³",
          "confidence_interval": [23.5, 30.2]
        },
        "o3": {
          "value": 0.045,
          "unit": "ppm",
          "confidence_interval": [0.040, 0.050]
        },
        "no2": {
          "value": 38.5,
          "unit": "ppb",
          "confidence_interval": [33.0, 44.0]
        }
      },
      "primary_pollutant": "PM2.5",
      "health_recommendation": "Moderate - acceptable for most people"
    },
    ...
  ]
}
```

---

## 6. Map Overlay Data (Windy.com Style)

### Particle Animation Data
```
Endpoint: /api/map/particles
Method: GET
Parameters:
  - bounds: object {north, south, east, west}
  - parameter: string ("no2"|"hcho"|"pm25")
  - timestamp: ISO 8601 datetime
  - resolution: string ("high"|"medium"|"low")

Response:
{
  "parameter": "no2",
  "timestamp": "2025-01-03T14:00:00Z",
  "bounds": {...},
  "resolution": "4.4km",
  "grid": {
    "width": 100,
    "height": 80,
    "data": [
      [2.3e15, 2.5e15, 2.4e15, ...],
      [2.2e15, 2.6e15, 2.5e15, ...],
      ...
    ]
  },
  "color_scale": {
    "min": 1e15,
    "max": 5e15,
    "unit": "molecules/cm²"
  }
}
```

### Heatmap Data
```
Endpoint: /api/map/heatmap
Method: GET
Parameters:
  - bounds: object {north, south, east, west}
  - parameter: string
  - timestamp: ISO 8601 datetime

Response:
{
  "parameter": "aqi",
  "timestamp": "2025-01-03T14:00:00Z",
  "points": [
    {
      "coordinates": {"lat": 34.05, "lng": -118.25},
      "value": 52,
      "intensity": 0.52
    },
    ...
  ]
}
```

---

## 7. Health Alert System

### Generate Personalized Alerts
```
Endpoint: /api/health-alerts/generate
Method: POST
Body:
{
  "coordinates": {"latitude": 34.0522, "longitude": -118.2437},
  "health_profile": {
    "conditions": ["asthma", "heart_disease"],
    "sensitivity_level": "high",
    "age_group": "elderly",
    "activity_level": "moderate"
  }
}

Response:
{
  "alerts": [
    {
      "id": "alert_001",
      "severity": "moderate",
      "pollutant": "PM2.5",
      "current_value": 35.2,
      "threshold": 25.0,
      "recommendation": "Limit outdoor activities to 1-2 hours",
      "actions": [
        "Carry rescue inhaler",
        "Avoid strenuous exercise",
        "Monitor symptoms closely"
      ]
    }
  ],
  "overall_risk": "moderate",
  "safe_for_outdoor_activities": false
}
```

---

## 8. Data Quality & Validation

### Data Quality Metrics
```
Endpoint: /api/data-quality
Method: GET
Parameters:
  - latitude: float
  - longitude: float
  - timestamp: ISO 8601 datetime

Response:
{
  "satellite_data": {
    "available": true,
    "quality": "good",
    "coverage": 0.95,
    "last_update": "2025-01-03T14:00:00Z",
    "data_age_minutes": 15
  },
  "ground_data": {
    "available": true,
    "nearest_station_distance_km": 5.2,
    "last_update": "2025-01-03T14:00:00Z",
    "data_age_minutes": 10
  },
  "validation": {
    "satellite_ground_correlation": 0.87,
    "confidence_score": 0.92
  }
}
```

---

## Authentication & Rate Limits

### API Keys Required
1. **NASA Earthdata**: For TEMPO satellite data
2. **EPA AirNow**: For US ground station data
3. **OpenAQ**: Optional, has free tier
4. **OpenWeatherMap**: For weather context

### Recommended Rate Limits
- **Real-time queries**: 60 requests/minute
- **Historical data**: 10 requests/minute
- **Forecast data**: 30 requests/minute
- **Map overlays**: 20 requests/minute

---

## Data Update Frequencies

1. **NASA TEMPO**: Hourly (updates every hour)
2. **EPA AirNow**: Real-time (updates every 5-15 minutes)
3. **OpenAQ**: Near real-time (varies by station)
4. **Weather Data**: Hourly
5. **Forecasts**: Updated every 3-6 hours

---

## Implementation Priority

### Phase 1 (Immediate - Core Functionality)
1. ✅ NASA TEMPO comprehensive endpoint (all 5 pollutants)
2. ✅ EPA AirNow current data
3. ✅ OpenWeatherMap current weather
4. ✅ Basic health recommendations

### Phase 2 (Enhanced Features)
5. ⏳ Historical data endpoints
6. ⏳ Air quality forecasting
7. ⏳ OpenAQ global data
8. ⏳ Data quality metrics

### Phase 3 (Advanced Visualization)
9. ⏳ Map overlay particle data
10. ⏳ Heatmap generation
11. ⏳ Real-time streaming updates
12. ⏳ Advanced health alert system

---

## Notes for API Providers

- All timestamps should be in UTC (ISO 8601 format)
- Geographic coordinates should use WGS84 datum
- Include uncertainty/confidence metrics when available
- Support CORS for browser-based requests
- Provide WebSocket endpoints for real-time streaming
- Include data version/revision tracking
- Support batch requests for efficiency

---

## Contact & Support

For API integration questions or custom endpoint requirements, please contact:
- **Email**: api-support@airwatchpro.com
- **GitHub**: https://github.com/AbdulRahmanAzam/NASA-Space-Apps-Challenge
- **Documentation**: https://airwatchpro.vercel.app/docs
