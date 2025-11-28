import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { Home } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function SatelliteViewPanel({ coordinates }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (coordinates && mapRef.current) {
      mapRef.current.setView([coordinates.lat, coordinates.lng], 18);
    }
  }, [coordinates]);

  const center = coordinates ? [coordinates.lat, coordinates.lng] : [37.7749, -122.4194];

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={18}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={false}
        ref={mapRef}
      >
        {/* Esri World Imagery - High quality satellite */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles © Esri"
          maxZoom={19}
        />

        {/* Property marker */}
        {coordinates && (
          <>
            {/* Outer pulse ring */}
            <Circle
              center={[coordinates.lat, coordinates.lng]}
              radius={30}
              pathOptions={{
                color: '#00E5FF',
                fillColor: '#00E5FF',
                fillOpacity: 0.1,
                weight: 2,
              }}
            />
            
            {/* Inner target */}
            <Circle
              center={[coordinates.lat, coordinates.lng]}
              radius={10}
              pathOptions={{
                color: '#00E5FF',
                fillColor: '#00E5FF',
                fillOpacity: 0.3,
                weight: 3,
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <Home className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
                  <p className="font-bold text-cyan-600">TARGET PROPERTY</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {coordinates.lat.toFixed(6)}°, {coordinates.lng.toFixed(6)}°
                  </p>
                </div>
              </Popup>
            </Circle>
          </>
        )}
      </MapContainer>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-50" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400 opacity-50" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400 opacity-50" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400 opacity-50" />

        {/* Info badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-cyan-400 terminal-text uppercase tracking-wider">
              SATELLITE VIEW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
