import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const containerStyle = {
    width: '100%',
    height: '100%',
    background: '#0f172a'
};

// Default center (Kakinada/Samalkot area)
const defaultCenter: [number, number] = [17.0264, 82.2089];

interface MapProps {
    markers?: { id: string; lat: number; lng: number; title?: string; status?: 'available' | 'full' | 'crowded'; passengers?: number }[];
    center?: { lat: number; lng: number };
    zoom?: number;
    path?: { lat: number; lng: number }[];
    isDarkMode?: boolean;
}

// Custom Component to handle map center/zoom updates
const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

// Custom Moving Marker using CSS Transitions for Smoothness
const MovingBusMarker = ({ marker }: { marker: any }) => {
    const [rotation, setRotation] = useState(0);
    const [lastPos, setLastPos] = useState({ lat: marker.lat, lng: marker.lng });

    useEffect(() => {
        const dy = marker.lat - lastPos.lat;
        const dx = marker.lng - lastPos.lng;
        if (Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001) {
            const angle = Math.atan2(dx, dy) * (180 / Math.PI);
            setRotation(angle);
            setLastPos({ lat: marker.lat, lng: marker.lng });
        }
    }, [marker.lat, marker.lng, lastPos.lat, lastPos.lng]);

    const getIconColor = (status?: string) => {
        if (status === 'full') return "#f59e0b"; // Amber
        if (status === 'crowded') return "#ef4444"; // Red
        return "#10b981"; // Emerald/Available
    };

    const color = getIconColor(marker.status);

    // Create a custom DivIcon for a premium realistic top-down bus
    const icon = L.divIcon({
        className: 'custom-bus-icon-container',
        html: `
            <div style="position: relative; width: 44px; height: 102px; display: flex; align-items: center; justify-content: center;">
                <div style="
                    position: absolute;
                    inset: -20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: rotate(${rotation}deg);
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 280" style="filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.5)); width: 40px; height: 93px;">
                        <!-- Base shadow for 3D depth -->
                        <rect x="15" y="10" width="90" height="260" rx="15" fill="#000" opacity="0.3"/>
                        
                        <!-- Main Bus Body -->
                        <rect x="10" y="5" width="100" height="270" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
                        
                        <!-- Front Bumper -->
                        <path d="M 12 15 Q 60 0 108 15 L 108 25 L 12 25 Z" fill="#64748b"/>
                        <!-- Rear Bumper -->
                        <path d="M 12 265 Q 60 280 108 265 L 108 255 L 12 255 Z" fill="#64748b"/>
                        
                        <!-- Windshield (Front) -->
                        <path d="M 16 30 Q 60 22 104 30 L 102 55 L 18 55 Z" fill="#0f172a" opacity="0.95"/>
                        <!-- Windshield Reflection -->
                        <path d="M 20 32 Q 60 25 100 32 L 60 53 Z" fill="#ffffff" opacity="0.15"/>
                        
                        <!-- Rear Window -->
                        <path d="M 16 250 Q 60 258 104 250 L 102 235 L 18 235 Z" fill="#0f172a" opacity="0.95"/>
                        
                        <!-- Side Windows (Left & Right continuous dark tint) -->
                        <rect x="12" y="65" width="8" height="160" fill="#0f172a" opacity="0.9"/>
                        <rect x="100" y="65" width="8" height="160" fill="#0f172a" opacity="0.9"/>
                        
                        <!-- Roof details (AC Units, hatches) -->
                        <rect x="25" y="70" width="70" height="40" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
                        <rect x="35" y="75" width="50" height="30" rx="2" fill="#e2e8f0"/>
                        <line x1="40" y1="80" x2="80" y2="80" stroke="#94a3b8" stroke-width="2"/>
                        <line x1="40" y1="90" x2="80" y2="90" stroke="#94a3b8" stroke-width="2"/>
                        <line x1="40" y1="100" x2="80" y2="100" stroke="#94a3b8" stroke-width="2"/>
                        
                        <!-- Second AC Unit -->
                        <rect x="25" y="160" width="70" height="50" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
                        <circle cx="45" cy="185" r="12" fill="#64748b" />
                        <circle cx="75" cy="185" r="12" fill="#64748b" />
                        <circle cx="45" cy="185" r="8" fill="#334155" />
                        <circle cx="75" cy="185" r="8" fill="#334155" />
                        
                        <!-- Dynamic Color Stripe -->
                        <rect x="22" y="125" width="76" height="20" fill="${color}" opacity="0.9"/>
                        
                        <!-- Headlights -->
                        <ellipse cx="22" cy="12" rx="7" ry="4" fill="#fef08a" stroke="#facc15" stroke-width="1"/>
                        <ellipse cx="98" cy="12" rx="7" ry="4" fill="#fef08a" stroke="#facc15" stroke-width="1"/>
                        <!-- Headlight Beams (Glow) -->
                        <path d="M 15 8 L -10 -30 L 40 -30 Z" fill="url(#beam)" opacity="0.6"/>
                        <path d="M 105 8 L 80 -30 L 130 -30 Z" fill="url(#beam)" opacity="0.6"/>
                        
                        <!-- Tail Lights -->
                        <rect x="16" y="260" width="18" height="5" rx="2" fill="#ef4444" stroke="#dc2626"/>
                        <rect x="86" y="260" width="18" height="5" rx="2" fill="#ef4444" stroke="#dc2626"/>
                        
                        <defs>
                            <linearGradient id="beam" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
                                <stop offset="100%" stop-color="#fef08a" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                ${marker.passengers !== undefined ? `
                    <div style="
                        position: absolute;
                        top: -30px;
                        background: rgba(15, 23, 42, 0.95);
                        backdrop-filter: blur(4px);
                        color: white;
                        padding: 4px 10px;
                        border-radius: 12px;
                        font-size: 11px;
                        font-weight: 900;
                        border: 2px solid ${color};
                        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                        white-space: nowrap;
                        z-index: 1000;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-family: inherit;
                    ">
                        <span style="color: ${color}; font-size: 8px;">●</span> ${marker.passengers}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.7"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                ` : ''}
            </div>
            <style>
                .leaflet-marker-icon {
                    transition: transform 1s linear !important;
                }
            </style>
        `,
        iconSize: [44, 102],
        iconAnchor: [22, 51]
    });

    return (
        <Marker position={[marker.lat, marker.lng]} icon={icon}>
            {marker.title && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap shadow-2xl z-[1000] uppercase tracking-tighter">
                    {marker.title}
                </div>
            )}
        </Marker>
    );
};

const SmartMap: React.FC<MapProps> = ({ markers = [], center, zoom = 12, path = [], isDarkMode = true }) => {
    const mapCenter: [number, number] = center
        ? [center.lat, center.lng]
        : defaultCenter;
    const polylinePath = path.map(p => [p.lat, p.lng] as [number, number]);

    return (
        <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={containerStyle}
            zoomControl={false}
            attributionControl={false}
        >
            <ChangeView center={mapCenter} zoom={zoom} />

            {/* Premium Colorful Map Tiles for Light Mode to highlight greenery and water */}
            <TileLayer
                url={isDarkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                }
                attribution='&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            />

            {polylinePath.length > 0 && (
                <Polyline
                    positions={polylinePath}
                    pathOptions={{
                        color: "#14b8a6",
                        weight: 4,
                        opacity: 0.6,
                        dashArray: '10, 10'
                    }}
                />
            )}

            {markers.map(marker => (
                <MovingBusMarker key={marker.id} marker={marker} />
            ))}

            {/* Glassmorphism Overlays can be added here if needed using Leaflet Controls */}
        </MapContainer>
    );
}

export default React.memo(SmartMap);
