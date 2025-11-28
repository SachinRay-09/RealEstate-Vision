# ⚡ Quick Reference Card

## 🚀 Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📁 Key Files to Edit

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/agents/MarketAnalystAgent.js` | Add demo properties | Adding new addresses |
| `src/agents/MLValuationAgent.js` | Adjust price model | Tuning predictions |
| `src/components/3d/HouseModel.jsx` | Change 3D model | Using real .glb files |
| `src/components/map/SatelliteView.jsx` | Satellite view | Adding Mapbox |
| `src/App.jsx` | Main layout | UI changes |
| `tailwind.config.js` | Theme colors | Branding |

## 🎨 Color Scheme

```js
Primary: cyan-500    (#06b6d4)
Secondary: blue-500  (#3b82f6)
Background: slate-950 (#020617)
Text: white          (#ffffff)
Accent: green-500    (#22c55e)
Error: red-500       (#ef4444)
```

## 🔧 Common Customizations

### Add a New Demo Property
```js
// src/agents/MarketAnalystAgent.js
'Your Address': {
  sqFt: 2000,
  bedrooms: 3,
  bathrooms: 2,
  yearBuilt: 2015,
  // ... more fields
}
```

### Change Animation Speed
```js
// src/agents/ReconstructionAgent.js
await this.delay(1000); // Change milliseconds
```

### Adjust 3D Camera
```jsx
// src/components/3d/ModelViewer.jsx
<PerspectiveCamera position={[10, 8, 10]} fov={50} />
```

### Modify ML Model
```js
// src/agents/MLValuationAgent.js
const sqFtWeight = 150; // Adjust coefficients
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 in use | Change in `vite.config.ts`: `server: { port: 3000 }` |
| 3D not rendering | Check WebGL support in browser |
| Build fails | Run `npm install` again |
| Slow performance | Reduce 3D complexity or disable shadows |

## 📊 Agent States

```
idle → scanning → analyzing → complete
  ↓       ↓          ↓           ↓
 ○       ⚡         ⚡          ✓
```

## 🎯 Demo Addresses

- `123 Main St` - Premium property ($485k)
- `456 Oak Avenue` - Luxury home ($675k)
- `789 Pine Street` - Starter home ($295k)
- Any other address - Default property ($325k)

## 🔗 Useful Links

- Dev Server: http://localhost:5173
- Three.js Docs: https://threejs.org/docs/
- Tailwind Classes: https://tailwindcss.com/docs
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber

## 💡 Pro Tips

1. **Fast Reload**: Vite HMR updates instantly
2. **Console Logs**: Check browser console for agent activity
3. **Mobile Testing**: Use Chrome DevTools device emulation
4. **Performance**: Open React DevTools Profiler
5. **3D Debug**: Add `<axesHelper />` to see coordinate system

## 🎬 Demo Flow

1. Enter "123 Main St"
2. Click "Analyze"
3. Watch agents (left panel)
4. Toggle 3D ↔ Satellite
5. Click "Enter VR"
6. Show analytics (right panel)
7. Click "New Analysis"

## 📦 Bundle Size

- Total: ~1.6 MB
- Three.js: ~600 KB
- React: ~150 KB
- Framer Motion: ~100 KB
- Other: ~750 KB

## ⚙️ Environment Variables (Optional)

Create `.env` file:
```
VITE_MAPBOX_TOKEN=your_token_here
VITE_API_KEY=your_api_key_here
```

Access in code:
```js
const token = import.meta.env.VITE_MAPBOX_TOKEN;
```

## 🚢 Deploy Checklist

- [ ] Run `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Check bundle size warnings
- [ ] Test on mobile
- [ ] Update README with live URL
- [ ] Add screenshots
- [ ] Deploy to Vercel/Netlify

## 📝 Git Workflow

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Commit prefixes:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructure
- `perf:` Performance
- `test:` Tests

---

**Need Help?** Check PROJECT_SUMMARY.md for detailed info!
