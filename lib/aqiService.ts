import { CityAQI } from './mockData';

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface WeatherAQIResponse {
    coord: { lon: number; lat: number };
    list: Array<{
        main: { aqi: number };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
    }>;
}

// In-memory cache for AQI data
const cache = new Map<string, { data: CityAQI[]; timestamp: number }>();

function getAQICategory(aqi: number): 'good' | 'moderate' | 'unhealthy' | 'veryUnhealthy' | 'hazardous' {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 150) return 'unhealthy';
    if (aqi <= 200) return 'veryUnhealthy';
    return 'hazardous';
}

function convertOpenWeatherAQI(openWeatherAQI: number): number {
    // OpenWeatherMap uses 1-5 scale, convert to US EPA AQI scale (0-500)
    const aqiMap: { [key: number]: number } = {
        1: 25,   // Good
        2: 75,   // Fair
        3: 125,  // Moderate
        4: 175,  // Poor  
        5: 250,  // Very Poor
    };
    return aqiMap[openWeatherAQI] || 100;
}

export async function fetchRealAQIData(cities: Array<{ city: string; latitude: number; longitude: number }>): Promise<CityAQI[]> {
    // Check cache first
    const cacheKey = 'indonesian_cities_aqi';
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    // If no API key, return empty (will use fallback)
    if (!OPENWEATHER_API_KEY) {
        return [];
    }

    try {
        const results = await Promise.all(
            cities.map(async (city) => {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.latitude}&lon=${city.longitude}&appid=${OPENWEATHER_API_KEY}`,
                        { next: { revalidate: 3600 } } // Cache for 1 hour
                    );

                    if (!response.ok) {
                        throw new Error(`API call failed for ${city.city}`);
                    }

                    const data: WeatherAQIResponse = await response.json();
                    const airQuality = data.list[0];
                    const aqi = convertOpenWeatherAQI(airQuality.main.aqi);

                    return {
                        city: city.city,
                        aqi,
                        category: getAQICategory(aqi),
                        latitude: city.latitude,
                        longitude: city.longitude,
                        pm25: airQuality.components.pm2_5,
                        pm10: airQuality.components.pm10,
                    };
                } catch (error) {
                    console.error(`Error fetching AQI for ${city.city}:`, error);
                    return null;
                }
            })
        );

        const validResults = results.filter((r): r is CityAQI => r !== null);

        // Cache the results
        cache.set(cacheKey, { data: validResults, timestamp: Date.now() });

        return validResults;
    } catch (error) {
        console.error('Error fetching real AQI data:', error);
        return [];
    }
}

export function clearAQICache() {
    cache.clear();
}
