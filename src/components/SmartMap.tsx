import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

// Default center (Pragati Engineering College area or Kakinada)
const defaultCenter = {
    lat: 17.0264,
    lng: 82.2089
};

interface MapProps {
    markers?: { id: string; lat: number; lng: number; title?: string }[];
    center?: { lat: number; lng: number };
    zoom?: number;
}

const SmartMap: React.FC<MapProps> = ({ markers = [], center = defaultCenter, zoom = 12 }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (loadError) {
        return (
            <div className="w-full h-full bg-red-50 flex flex-col items-center justify-center p-8 text-center text-red-800 border-2 border-red-100 rounded-xl">
                <p className="font-bold text-lg mb-2">Google Maps Error</p>
                <p className="text-sm">Failed to load Google Maps script. Please check your API key.</p>
                <p className="text-xs mt-4 text-gray-500 font-mono bg-white p-2 rounded border border-gray-200">
                    Key: {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? "Present" : "Missing"}
                </p>
            </div>
        );
    }

    if (!isLoaded) return <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-500">Loading Google Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            {markers.map(marker => (
                <Marker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.title}
                    icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/bus.png", // Use a bus icon if possible, or default
                        scaledSize: typeof google !== 'undefined' ? new google.maps.Size(40, 40) : undefined // Check safely
                    }}
                />
            ))}
        </GoogleMap>
    );
}

export default React.memo(SmartMap);
