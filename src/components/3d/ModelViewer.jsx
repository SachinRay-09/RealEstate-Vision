import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import HouseModel from './HouseModel';
import ScanningBeam from './ScanningBeam';

export default function ModelViewer({ modelPath, isVRMode }) {
  return (
    <div className="w-full h-full relative">
      <Canvas 
        className="bg-transparent"
        gl={{ alpha: true, antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={45} />
        
        {/* Lighting for scanner aesthetic */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00E5FF" />
        <pointLight position={[10, 5, 10]} intensity={0.3} color="#00E5FF" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00E5FF"
          castShadow
        />

        {/* Grid - LiDAR style */}
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#00E5FF"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#0EA5E9"
          fadeDistance={40}
          fadeStrength={1}
          position={[0, -0.01, 0]}
          infiniteGrid
        />

        {/* 3D Model with Stage for better lighting */}
        <Suspense fallback={null}>
          <Stage
            intensity={0.5}
            environment={null}
            shadows={false}
            adjustCamera={false}
          >
            <HouseModel modelPath={modelPath} />
          </Stage>
        </Suspense>

        {/* Scanning beam effect */}
        <ScanningBeam />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-50" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400 opacity-50" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400 opacity-50" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400 opacity-50" />

        {/* Scanning indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs text-cyan-400 terminal-text uppercase tracking-wider">
              3D RECONSTRUCTION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
