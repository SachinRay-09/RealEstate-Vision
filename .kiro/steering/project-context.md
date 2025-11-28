---
inclusion: always
---

# RealEstate Vision - Project Context

## Project Overview
RealEstate Vision is a cinematic AI-powered property intelligence platform built for a hackathon. It orchestrates 5 specialized AI agents to analyze real estate properties in seconds.

## Core Philosophy
- **User First**: Every feature must be intuitive and fast
- **Visual Excellence**: "Iron Man HUD" aesthetic with glass morphism
- **Free Tier Only**: No paid services, no API keys required
- **Production Ready**: Not a prototype, but deployment-ready code

## Technology Stack
- **Frontend**: React 18 + Vite
- **3D Graphics**: Three.js + React Three Fiber
- **Maps**: Leaflet + Esri World Imagery (FREE)
- **Styling**: Tailwind CSS with custom glass utilities
- **Animations**: Framer Motion
- **State**: Custom React hooks (no Redux)

## Architecture Principles

### 1. Agent-Based Design
Five specialized agents work in parallel:
- **The Eye** (Reconstruction): 3D model generation
- **The Analyst** (Market Data): Property information
- **The Brain** (ML Valuation): Price prediction
- **The Scout** (Satellite): Aerial imagery
- **The Guide** (Virtual Tour): VR waypoints

### 2. Glass Morphism UI
- Transparent panels (70% opacity) over satellite background
- Backdrop blur for depth
- Cyan (#00E5FF) accents for active states
- Black text on cyan buttons (high contrast)
- AAA accessibility compliance

### 3. Performance First
- 60 FPS animations
- < 2 second load time
- Parallel agent execution
- Optimized bundle size

## Code Standards

### React Components
```jsx
// Always use functional components with hooks
export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  // Use useCallback for functions passed as props
  const handleAction = useCallback(() => {
    // implementation
  }, [dependencies]);
  
  return (
    <div className="glass rounded-lg p-4">
      {/* JSX */}
    </div>
  );
}
```

### Styling Conventions
- Use Tailwind utility classes
- Custom utilities: `.glass`, `.glass-strong`
- Colors: `text-cyan-400`, `bg-slate-900`
- Spacing: Consistent 4px grid (p-4, gap-4, etc.)
- Animations: Framer Motion for complex, CSS for simple

### File Organization
```
src/
├── agents/          # Business logic (pure JS)
├── components/      # React components
│   ├── 3d/         # Three.js components
│   ├── dashboard/  # UI components
│   └── map/        # Map components
├── hooks/          # Custom React hooks
└── utils/          # Helper functions
```

## Common Patterns

### Agent Implementation
```javascript
export class AgentName {
  async process(input) {
    // Simulate work
    await this.delay(1000);
    
    // Update progress if applicable
    if (this.onProgress) {
      this.onProgress({ message: 'Processing...', percent: 50 });
    }
    
    // Return results
    return { data: 'result' };
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Glass Panel Component
```jsx
<div className="glass-strong rounded-lg p-6">
  <h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
    SECTION TITLE
  </h3>
  <div className="mt-4">
    {/* Content */}
  </div>
</div>
```

### Button Styling
```jsx
// Primary action - cyan with black text
<button className="bg-cyan-400 text-black hover:bg-cyan-300 px-6 py-3 rounded font-bold uppercase tracking-wider">
  ACTION
</button>

// Secondary action - glass with white text
<button className="glass hover:bg-white/10 px-4 py-2 rounded text-white">
  Cancel
</button>
```

## Important Constraints

### DO
✅ Use free-tier services only
✅ Maintain 60 FPS performance
✅ Ensure AAA accessibility
✅ Write self-documenting code
✅ Add loading states
✅ Handle errors gracefully
✅ Use semantic HTML
✅ Test on multiple browsers

### DON'T
❌ Add paid API dependencies
❌ Use Redux or complex state management
❌ Create blocking operations
❌ Ignore accessibility
❌ Use white text on white backgrounds
❌ Skip error handling
❌ Hardcode values that should be configurable
❌ Create components over 200 lines

## Development Workflow

### Adding New Features
1. Create spec in `.kiro/specs/` if complex
2. Implement in appropriate directory
3. Add to main App.jsx
4. Test functionality
5. Update documentation
6. Check accessibility
7. Verify performance

### Fixing Bugs
1. Reproduce the issue
2. Identify root cause
3. Implement fix
4. Test thoroughly
5. Check for similar issues elsewhere
6. Update tests if needed
7. Document the fix

### Updating UI
1. Maintain glass morphism aesthetic
2. Ensure text contrast (AAA)
3. Use consistent spacing
4. Add smooth transitions
5. Test on different screen sizes
6. Verify 60 FPS performance
7. Update design docs

## Key Files Reference

### Core Application
- `src/App.jsx` - Main application layout
- `src/hooks/useAgentOrchestrator.js` - State management
- `src/index.css` - Global styles and utilities

### Documentation
- `START_HERE.md` - Quick orientation
- `KIRO_USAGE_WRITEUP.md` - Kiro usage details
- `CINEMATIC_UI_GUIDE.md` - Design system
- `PROJECT_SUMMARY.md` - Technical overview

### Configuration
- `package.json` - Dependencies
- `tailwind.config.js` - Tailwind customization
- `vite.config.ts` - Build configuration

## Success Metrics
- Load time: < 2 seconds
- Analysis time: < 10 seconds
- FPS: 60 (maintained)
- Accessibility: AAA contrast
- Bundle size: < 500 KB gzipped
- Browser support: All modern browsers

## Remember
This project demonstrates **conversational development with Kiro**. Every component, every style, every line of documentation was generated through natural language interaction. Maintain this quality standard in all new work.
