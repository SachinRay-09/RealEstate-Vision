import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

export default function SatelliteBackground({ coordinates, isActive }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (coordinates && mapRef.current && isActive) {
      // Fly to the coordinates when active
      mapRef.current.flyTo([coordinates.lat, coordinates.lng], 18, {
        duration: 2,
        easeLinearity: 0.5
      });
    }
  }, [coordinates, isActive]);

  const defaultCenter = [37.7749, -122.4194]; // San Francisco
  const center = coordinates ? [coordinates.lat, coordinates.lng] : defaultCenter;

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden">
      {/* Leaflet Map with Esri Satellite Tiles */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          filter: 'brightness(0.5) contrast(1.2)',
          transform: isActive ? 'perspective(1500px) rotateX(15deg)' : 'perspective(1500px) rotateX(0deg)',
          transformOrigin: 'center center',
          transition: 'transform 2s ease-out'
        }}
      >
        <MapContainer
          center={center}
          zoom={isActive ? 18 : 12}
          style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}
          zoomControl={false}
          attributionControl={false}
          ref={mapRef}
        >
          {/* Esri World Imagery - FREE satellite tiles */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles © Esri"
            maxZoom={19}
          />

          {/* Target marker when coordinates are set */}
          {coordinates && (
            <>
              {/* Outer pulse ring */}
              <Circle
                center={[coordinates.lat, coordinates.lng]}
                radius={50}
                pathOptions={{
                  color: '#00E5FF',
                  fillColor: '#00E5FF',
                  fillOpacity: 0.1,
                  weight: 2,
                  className: 'animate-pulse'
                }}
              />
              
              {/* Inner target circle */}
              <Circle
                center={[coordinates.lat, coordinates.lng]}
                radius={20}
                pathOptions={{
                  color: '#00E5FF',
                  fillColor: '#00E5FF',
                  fillOpacity: 0.3,
                  weight: 3
                }}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-cyan-600">TARGET ACQUIRED</p>
                    <p className="text-xs text-gray-600">
                      {coordinates.lat.toFixed(4)}°, {coordinates.lng.toFixed(4)}°
                    </p>
                  </div>
                </Popup>
              </Circle>
            </>
          )}
        </MapContainer>
      </div>

      {/* Scanning grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" className="text-cyan-500">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Scanning beam effect */}
      {isActive && (
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 blur-sm pointer-events-none"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/80 pointer-events-none" />
      
      {/* Corner HUD elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-400/30" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30" />
      </div>
    </div>
  );
}
