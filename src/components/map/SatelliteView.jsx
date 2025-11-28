import { useEffect, useState } from 'react';
import { Home, MapPin, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SatelliteView({ coordinates, isActive }) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (coordinates && isActive) {
      // Animate rotation
      let angle = 0;
      const interval = setInterval(() => {
        angle += 0.5;
        if (angle > 360) angle = 0;
        setRotation(angle);
      }, 50);

      // Zoom in animation
      setZoom(1.5);

      return () => clearInterval(interval);
    }
  }, [coordinates, isActive]);

  const lat = coordinates?.lat || 37.7749;
  const lng = coordinates?.lng || -122.4194;

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 overflow-hidden">
      {/* Satellite Imagery Simulation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: zoom,
            rotate: rotation
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="600" height="600" className="text-cyan-400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="600" height="600" fill="url(#grid)" />
            </svg>
          </div>

          {/* Property marker */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="relative">
              {/* Pulse rings */}
              <div className="absolute inset-0 -m-8">
                <div className="w-16 h-16 border-2 border-red-500 rounded-full animate-ping opacity-75" />
              </div>
              <div className="absolute inset-0 -m-12">
                <div className="w-24 h-24 border-2 border-red-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
              </div>
              
              {/* Main marker */}
              <div className="bg-red-500 p-3 rounded-full shadow-2xl border-4 border-white">
                <Home className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Simulated satellite imagery */}
          <div className="w-96 h-96 relative">
            {/* Streets */}
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-700 opacity-40" />
            <div className="absolute top-0 bottom-0 left-1/2 w-8 bg-gray-700 opacity-40" />
            
            {/* Buildings */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gray-600 opacity-60 shadow-lg" />
            <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gray-500 opacity-60 shadow-lg" />
            <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gray-600 opacity-60 shadow-lg" />
            
            {/* Green spaces */}
            <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-green-700 opacity-40 rounded-full" />
            <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-green-600 opacity-40 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400" />

        {/* Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-2 border-cyan-400 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-400" />
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-cyan-500/50 space-y-2 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-semibold text-cyan-400">Satellite View Active</span>
        </div>
        
        <div className="text-xs space-y-1 text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>Lat: {lat.toFixed(4)}°</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>Lng: {lng.toFixed(4)}°</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Altitude: 500m</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Bearing: {Math.round(rotation)}°</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded text-sm pointer-events-auto">
        <p className="text-cyan-400 font-medium">🛰️ Simulated Satellite View</p>
        <p className="text-xs text-gray-400 mt-1">
          For real satellite imagery, add Mapbox token
        </p>
      </div>
    </div>
  );
}
