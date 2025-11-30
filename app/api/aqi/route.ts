import { NextResponse } from 'next/server';
import { fetchRealAQIData } from '@/lib/aqiService';
import { indonesianCities } from '@/lib/mockData';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
    try {
        // Extract city coordinates from mock data
        const cityCoords = indonesianCities.slice(0, 10).map(city => ({
            city: city.city,
            latitude: city.latitude,
            longitude: city.longitude,
        }));

        // Fetch real AQI data
        const realData = await fetchRealAQIData(cityCoords);

        // If real data fetch failed or is empty, return mock data
        if (realData.length === 0) {
            return NextResponse.json({
                data: indonesianCities.slice(0, 10),
                source: 'mock',
                message: 'Using mock data - API key not configured or API unavailable'
            });
        }

        return NextResponse.json({
            data: realData,
            source: 'openweathermap',
            message: 'Real-time data from OpenWeatherMap'
        });
    } catch (error) {
        console.error('AQI API error:', error);
        // Fallback to mock data on error
        return NextResponse.json({
            data: indonesianCities.slice(0, 10),
            source: 'mock',
            message: 'Using mock data due to API error'
        });
    }
}
