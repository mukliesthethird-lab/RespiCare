'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { CityAQI, getAQIColor } from '@/lib/mockData';
import 'leaflet/dist/leaflet.css';

interface IndonesiaMapProps {
  cities: CityAQI[];
}

function MapUpdater() {
  const map = useMap();
  
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  
  return null;
}

export default function IndonesiaMap({ cities }: IndonesiaMapProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <MapUpdater />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <CircleMarker
            key={city.city}
            center={[city.latitude, city.longitude]}
            radius={15}
            fillColor={getAQIColor(city.aqi)}
            fillOpacity={0.7}
            color="#fff"
            weight={2}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{city.city}</h3>
                <p className="text-2xl font-bold" style={{ color: getAQIColor(city.aqi) }}>
                  AQI: {city.aqi}
                </p>
                <p className="text-sm text-gray-600">PM2.5: {city.pm25} | PM10: {city.pm10}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
