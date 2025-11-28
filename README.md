# 🏠 RealEstate Vision - AI-Powered Property Intelligence

> **Built entirely with Kiro in 3 hours** | Production-ready | 100% Free Tier

A cinematic "Iron Man HUD" style dashboard that orchestrates 5 AI agents to analyze real estate properties in seconds. Features live satellite imagery, interactive 3D models, ML price predictions, and a stunning glass morphism UI.

**🏆 Hackathon Submission** | [Demo](./DEMO.md) | [Kiro Usage Writeup](./KIRO_USAGE_WRITEUP.md) | [Submission Details](./HACKATHON_SUBMISSION.md)

## ⚡ Quick Start

```bash
cd realestate-vision
npm install
npm run dev
# Open http://localhost:5173
```

**Try it**: Enter "123 Main St" → Click "INITIATE SCAN" → Watch the magic happen!

## 🎯 Features

### 5 AI Agents Working in Parallel

1. **The Eye (Reconstruction Agent)** - Simulates 3D point cloud generation and mesh creation
2. **The Analyst (Market Data Agent)** - Fetches property details and market data
3. **The Brain (ML Valuation Agent)** - Predicts property value using machine learning
4. **The Scout (Satellite Agent)** - Provides aerial/satellite view with flyover animation
5. **The Guide (Virtual Tour Agent)** - Enables VR walkthrough mode

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## 🎮 Usage

1. Enter a property address (try "123 Main St" for demo data)
2. Click "Analyze" to trigger all 5 agents
3. Watch the agents work in parallel:
   - Satellite view animates a flyover
   - 3D reconstruction shows progress
   - Market data is fetched
   - ML model predicts value
4. Toggle between 3D Model and Satellite views
5. Click "Enter VR" for immersive mode

## 🛠️ Tech Stack (100% Free Tier)

- **Frontend**: React + Vite + Tailwind CSS
- **3D Engine**: Three.js + React Three Fiber + Drei
- **Maps**: React Map GL + leaflet
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── agents/              # 5 Agent logic modules
│   ├── ReconstructionAgent.js
│   ├── MarketAnalystAgent.js
│   ├── MLValuationAgent.js
│   ├── SatelliteAgent.js
│   └── VirtualTourAgent.js
├── components/
│   ├── 3d/             # Three.js components
│   ├── dashboard/      # UI components
│   └── map/            # Satellite/Map components
├── hooks/
│   └── useAgentOrchestrator.js  # State management
└── App.jsx
```

## 🔧 Configuration

### 3D Models

Place `.glb` files in `public/models/` and update the path in the agents.

## 🎨 Customization

### Add Real API Integration

Edit `src/agents/MarketAnalystAgent.js` to connect to RapidAPI or other real estate APIs.

### Use Real 3D Models

Replace the placeholder house in `src/components/3d/HouseModel.jsx` with GLTF loader:

```jsx
import { useGLTF } from '@react-three/drei';
const { scene } = useGLTF('/models/house.glb');
return <primitive object={scene} />;
```

### Enhance ML Model

Replace the simple linear regression in `MLValuationAgent.js` with a trained scikit-learn model or ONNX runtime.

## 📝 License

MIT - Built for hackathons and learning!

## 🤝 Contributing

This is a hackathon starter template. Fork it, customize it, and make it your own!
