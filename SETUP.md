# Setup Guide

## Installation

```bash
cd realestate-vision
npm install
npm run dev
```

## What You'll See

1. **Dark Mode Dashboard** - Professional real estate analytics interface
2. **Search Bar** - Enter any address (uses mock data for demo)
3. **Agent Status Panel** (Left) - Watch 5 AI agents work in parallel
4. **Main Stage** (Center) - Toggle between 3D model and satellite view
5. **Analytics Panel** (Right) - ML price prediction and property details

## Demo Flow

1. Type "123 Main St" in the search bar
2. Click "Analyze"
3. Watch the orchestration:
   - 🛰️ Satellite view activates with flyover animation
   - 👁️ Reconstruction agent shows progress bar
   - 📊 Market analyst fetches property data
   - 🧠 ML brain predicts property value
   - 🎮 Virtual tour generates waypoints
4. View results in 3D or satellite mode
5. Click "Enter VR" for immersive experience

## Customization Quick Wins

### 1. Add More Demo Properties

Edit `src/agents/MarketAnalystAgent.js`:

```js
const mockData = {
  '456 Oak Ave': {
    sqFt: 3200,
    bedrooms: 5,
    // ... add more properties
  }
};
```

### 2. Change Color Scheme

Edit `src/App.jsx` - Look for Tailwind classes like `bg-cyan-500`, `from-slate-950`

### 3. Adjust 3D Camera

Edit `src/components/3d/ModelViewer.jsx`:

```jsx
<PerspectiveCamera makeDefault position={[15, 10, 15]} fov={60} />
```

### 4. Speed Up/Slow Down Agents

Edit delay times in each agent file (e.g., `await this.delay(1000)`)

## Troubleshooting

### Mapbox Map Not Loading

The demo uses a placeholder token. Get a free token from mapbox.com and replace it in `src/components/map/SatelliteView.jsx`

### 3D Scene is Black

Check browser console for WebGL errors. Try a different browser (Chrome/Edge recommended)

### Agents Not Running

Open browser console (F12) to see any JavaScript errors

## Next Steps

- Connect to real APIs (RapidAPI, Zillow alternatives)
- Add real 3D models from Sketchfab
- Deploy to Vercel/Netlify for live demo
- Add user authentication
- Implement property comparison feature
