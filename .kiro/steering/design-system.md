---
inclusion: fileMatch
fileMatchPattern: "**/*.{css,jsx,tsx}"
---

# Design System - Midnight Glass Theme

## Color Palette

### Primary Colors
```css
--slate-950: #020617    /* Body background */
--slate-900: #0f172a    /* Panel background */
--slate-800: #1e293b    /* Hover states */
```

### Accent Colors
```css
--cyan-400: #22d3ee     /* Active states, primary actions */
--cyan-500: #06b6d4     /* Hover states */
--blue-500: #3b82f6     /* Gradients */
--green-500: #10b981    /* Success states */
--red-500: #ef4444      /* Error states */
```

### Text Colors
```css
--white: #ffffff        /* Primary text */
--gray-100: #f3f4f6     /* Secondary text */
--gray-300: #d1d5db     /* Tertiary text */
--gray-400: #9ca3af     /* Labels */
--gray-500: #6b7280     /* Placeholders */
```

## Glass Morphism

### Glass Utility
```css
.glass {
  background-color: rgba(2, 6, 23, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
}
```

### Strong Glass Utility
```css
.glass-strong {
  background-color: rgba(2, 6, 23, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6);
}
```

### Usage
```jsx
// Light glass for subtle panels
<div className="glass rounded-lg p-4">

// Strong glass for important panels
<div className="glass-strong rounded-lg p-6">
```

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Terminal Text
```css
.terminal-text {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
}
```

### Heading Styles
```jsx
// Section Headers (HUD style)
<h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
  SECTION TITLE
</h3>

// Card Titles
<h2 className="text-2xl font-bold text-white">
  Card Title
</h2>

// Large Display
<h1 className="text-4xl font-bold text-white text-glow">
  Main Title
</h1>
```

### Body Text
```jsx
// Primary
<p className="text-white">Main content</p>

// Secondary
<p className="text-gray-300">Supporting text</p>

// Labels
<span className="text-xs text-gray-400 uppercase tracking-wider">
  LABEL
</span>
```

## Buttons

### Primary Action
```jsx
<button className="bg-cyan-400 text-black hover:bg-cyan-300 px-6 py-3 rounded font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all">
  PRIMARY ACTION
</button>
```

### Secondary Action
```jsx
<button className="glass hover:bg-white/10 px-4 py-2 rounded text-white transition-colors">
  Secondary
</button>
```

### Disabled State
```jsx
<button className="bg-gray-600 text-gray-400 px-6 py-3 rounded cursor-not-allowed" disabled>
  Disabled
</button>
```

### Icon Button
```jsx
<button className="glass rounded-lg p-2 hover:bg-white/10 transition-colors">
  <Icon className="w-5 h-5 text-cyan-400" />
</button>
```

## Inputs

### Text Input
```jsx
<input
  type="text"
  className="bg-transparent border-none outline-none text-white placeholder-gray-500 py-3 px-2"
  style={{ color: '#ffffff', caretColor: '#00E5FF' }}
  placeholder="Enter text..."
/>
```

### Input Container
```jsx
<div className="glass-strong rounded-lg p-2 flex items-center gap-3">
  <Search className="w-5 h-5 text-cyan-400" />
  <input className="flex-1 bg-transparent..." />
  <button className="bg-cyan-400 text-black...">Submit</button>
</div>
```

## Cards

### Basic Card
```jsx
<div className="glass-strong rounded-lg p-6">
  <h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-4">
    CARD TITLE
  </h3>
  <div className="space-y-4">
    {/* Content */}
  </div>
</div>
```

### Data Card
```jsx
<div className="glass rounded p-3 border border-white/10">
  <div className="flex items-center gap-2 mb-1">
    <Icon className="w-3 h-3 text-cyan-400" />
    <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">
      LABEL
    </span>
  </div>
  <div className="text-lg font-bold text-white">
    Value
  </div>
</div>
```

## Spacing

### Consistent Grid
Use 4px grid system:
- `p-1` = 4px
- `p-2` = 8px
- `p-3` = 12px
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px

### Common Patterns
```jsx
// Panel padding
<div className="p-6">

// Card padding
<div className="p-4">

// Gap between items
<div className="gap-4">

// Vertical spacing
<div className="space-y-4">
```

## Borders

### Subtle Borders
```jsx
<div className="border border-white/10">
```

### Accent Borders
```jsx
<div className="border border-cyan-500/30">
```

### Border Radius
```jsx
<div className="rounded">      {/* 4px */}
<div className="rounded-lg">   {/* 8px */}
<div className="rounded-full">  {/* 9999px */}
```

## Shadows

### Subtle Shadow
```jsx
<div className="shadow-lg">
```

### Glow Effect
```jsx
<div className="shadow-[0_0_15px_rgba(34,211,238,0.5)]">
```

### Text Glow
```css
.text-glow {
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
}
```

## Animations

### Fade In
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

### Slide In
```jsx
<motion.div
  initial={{ x: -300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.2 }}
>
```

### Scale
```jsx
<motion.div
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
>
```

### Pulse
```jsx
<div className="animate-pulse">
```

## Icons

### Icon Sizes
```jsx
<Icon className="w-4 h-4" />  {/* Small */}
<Icon className="w-5 h-5" />  {/* Medium */}
<Icon className="w-6 h-6" />  {/* Large */}
```

### Icon Colors
```jsx
<Icon className="text-cyan-400" />   {/* Active */}
<Icon className="text-green-400" />  {/* Success */}
<Icon className="text-red-400" />    {/* Error */}
<Icon className="text-gray-400" />   {/* Neutral */}
```

## Accessibility

### Contrast Requirements
- Text on glass: 7:1 (AAA)
- Buttons: 7:1+ (AAA)
- Labels: 4.5:1 (AA)

### Focus States
```jsx
<button className="focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2">
```

### ARIA Labels
```jsx
<button aria-label="Close dialog">
  <X className="w-4 h-4" />
</button>
```

## Responsive Design

### Breakpoints
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Mobile Adjustments
```jsx
<div className="p-4 md:p-6 lg:p-8">
```

## HUD Elements

### Corner Brackets
```jsx
<div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-50" />
```

### Status Indicator
```jsx
<div className="flex items-center gap-2">
  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
  <span className="text-xs text-cyan-400 terminal-text uppercase tracking-wider">
    STATUS
  </span>
</div>
```

### Progress Bar
```jsx
<div className="bg-slate-800 rounded-full h-1 overflow-hidden">
  <motion.div
    className="h-full bg-cyan-500"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
  />
</div>
```

## Do's and Don'ts

### ✅ DO
- Use glass morphism for panels
- Maintain 70% transparency
- Use cyan for active states
- Ensure AAA contrast
- Add smooth transitions
- Use uppercase for labels
- Include loading states

### ❌ DON'T
- Use white text on white buttons
- Create opaque panels (except 3D viewer)
- Mix different design styles
- Ignore accessibility
- Skip animations
- Use inconsistent spacing
- Forget hover states
