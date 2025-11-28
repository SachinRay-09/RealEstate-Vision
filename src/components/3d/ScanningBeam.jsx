import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ScanningBeam() {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      // Move beam up and down
      beamRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 3 + 2;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 0, 0]}>
      <planeGeometry args={[20, 0.1]} />
      <meshBasicMaterial
        color="#00E5FF"
        transparent
        opacity={0.3}
        side={2}
      />
    </mesh>
  );
}
