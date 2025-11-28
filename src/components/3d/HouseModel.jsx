import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

// Detailed modern house model
export default function HouseModel({ modelPath }) {
  const groupRef = useRef();

  // Slow rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Main House Structure */}
      <Box args={[5, 3.5, 6]} position={[0, 1.75, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} metalness={0.1} />
      </Box>

      {/* Roof - Gabled */}
      <mesh position={[0, 4, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[4, 2.5, 4]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>

      {/* Chimney */}
      <Box args={[0.5, 1.5, 0.5]} position={[1.5, 5, -1]} castShadow>
        <meshStandardMaterial color="#a0522d" roughness={0.8} />
      </Box>

      {/* Front Door */}
      <Box args={[1, 2.2, 0.15]} position={[0, 1.1, 3.08]} castShadow>
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0.2} />
      </Box>

      {/* Door Handle */}
      <mesh position={[0.3, 1.1, 3.15]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Windows - Front */}
      <Box args={[1, 1, 0.1]} position={[-1.5, 2.2, 3.05]} castShadow>
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} roughness={0.1} metalness={0.5} />
      </Box>
      <Box args={[1, 1, 0.1]} position={[1.5, 2.2, 3.05]} castShadow>
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} roughness={0.1} metalness={0.5} />
      </Box>

      {/* Windows - Side */}
      <Box args={[0.1, 1, 1]} position={[2.55, 2.2, 0]} castShadow>
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} roughness={0.1} metalness={0.5} />
      </Box>
      <Box args={[0.1, 1, 1]} position={[-2.55, 2.2, 0]} castShadow>
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} roughness={0.1} metalness={0.5} />
      </Box>

      {/* Garage */}
      <Box args={[2.5, 2.5, 3]} position={[-3.5, 1.25, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#d3d3d3" roughness={0.7} />
      </Box>

      {/* Garage Door */}
      <Box args={[2, 2, 0.1]} position={[-3.5, 1, 2.55]} castShadow>
        <meshStandardMaterial color="#696969" roughness={0.5} metalness={0.3} />
      </Box>

      {/* Foundation */}
      <Box args={[5.5, 0.4, 6.5]} position={[0, 0.2, 0]} receiveShadow>
        <meshStandardMaterial color="#a0a0a0" roughness={0.9} />
      </Box>

      {/* Front Steps */}
      <Box args={[1.5, 0.2, 0.8]} position={[0, 0.1, 3.7]} receiveShadow>
        <meshStandardMaterial color="#808080" roughness={0.8} />
      </Box>
      <Box args={[1.5, 0.2, 0.8]} position={[0, 0.3, 4.2]} receiveShadow>
        <meshStandardMaterial color="#808080" roughness={0.8} />
      </Box>

      {/* Landscaping - Trees */}
      <mesh position={[-4, 1.5, -2]} castShadow>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#228b22" roughness={0.9} />
      </mesh>
      <Box args={[0.2, 1, 0.2]} position={[-4, 0.5, -2]} castShadow>
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </Box>

      <mesh position={[4, 1.5, -2]} castShadow>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#228b22" roughness={0.9} />
      </mesh>
      <Box args={[0.2, 1, 0.2]} position={[4, 0.5, -2]} castShadow>
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </Box>

      {/* Driveway */}
      <Box args={[2.5, 0.05, 8]} position={[-3.5, 0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#505050" roughness={0.8} />
      </Box>
    </group>
  );
}

// To use a real GLTF model with wireframe:
// import { useGLTF } from '@react-three/drei';
// export default function HouseModel({ modelPath }) {
//   const { scene } = useGLTF(modelPath);
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material = new THREE.MeshStandardMaterial({
//         color: '#00E5FF',
//         wireframe: true,
//         emissive: '#00E5FF',
//         emissiveIntensity: 0.5
//       });
//     }
//   });
//   return <primitive object={scene} scale={0.5} />;
// }
