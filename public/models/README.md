# 3D Models Directory

Place your `.glb` or `.gltf` 3D house models here.

## Free 3D Model Resources

- [Sketchfab](https://sketchfab.com/search?q=house&type=models&features=downloadable) - Filter by "Downloadable"
- [Poly Haven](https://polyhaven.com/) - CC0 assets
- [Free3D](https://free3d.com/3d-models/house) - Various licenses

## Usage

1. Download a house model in GLTF/GLB format
2. Place it in this directory (e.g., `house.glb`)
3. Update the path in `src/agents/ReconstructionAgent.js`
4. Uncomment the GLTF loader in `src/components/3d/HouseModel.jsx`

## Current Setup

The app uses a procedural placeholder house built with Three.js primitives. This works out of the box without any external models.
