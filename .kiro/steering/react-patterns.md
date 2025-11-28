---
inclusion: fileMatch
fileMatchPattern: "**/*.{jsx,tsx}"
---

# React Development Patterns for RealEstate Vision

## Component Structure

### Functional Components Only
Always use functional components with hooks. No class components.

```jsx
// ✅ GOOD
export default function MyComponent({ data, onAction }) {
  const [state, setState] = useState(null);
  
  return <div>{/* JSX */}</div>;
}

// ❌ BAD
class MyComponent extends React.Component {
  // Don't use class components
}
```

### Props Destructuring
Destructure props in function signature for clarity.

```jsx
// ✅ GOOD
export default function Card({ title, description, onClose }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// ❌ BAD
export default function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      {/* Harder to read */}
    </div>
  );
}
```

## Hook Usage

### useState for Local State
```jsx
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
```

### useEffect for Side Effects
```jsx
useEffect(() => {
  // Setup
  const subscription = subscribeToData();
  
  // Cleanup
  return () => subscription.unsubscribe();
}, [dependencies]);
```

### useCallback for Stable Functions
```jsx
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Pass to child components
<ChildComponent onClick={handleClick} />
```

### useMemo for Expensive Calculations
```jsx
const expensiveValue = useMemo(() => {
  return calculateSomething(data);
}, [data]);
```

### Custom Hooks for Reusable Logic
```jsx
function useAgentOrchestrator() {
  const [state, setState] = useState('idle');
  // ... logic
  return { state, analyzeProperty, reset };
}
```

## Conditional Rendering

### Use Ternary for Simple Conditions
```jsx
{isLoading ? <Spinner /> : <Content />}
```

### Use && for Single Branch
```jsx
{error && <ErrorMessage error={error} />}
```

### Use Early Returns for Complex Logic
```jsx
if (!data) {
  return <Loading />;
}

if (error) {
  return <Error message={error} />;
}

return <Content data={data} />;
```

## Event Handlers

### Inline for Simple Actions
```jsx
<button onClick={() => setOpen(true)}>Open</button>
```

### Named Functions for Complex Logic
```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  // Complex logic
};

<form onSubmit={handleSubmit}>
```

### useCallback for Props
```jsx
const handleChange = useCallback((value) => {
  setValue(value);
  onValueChange?.(value);
}, [onValueChange]);
```

## Component Composition

### Container/Presentational Pattern
```jsx
// Container (logic)
function AgentTerminalContainer() {
  const { agentStatus } = useAgentOrchestrator();
  return <AgentTerminalView agentStatus={agentStatus} />;
}

// Presentational (UI)
function AgentTerminalView({ agentStatus }) {
  return (
    <div className="glass-strong">
      {/* Pure UI */}
    </div>
  );
}
```

### Compound Components
```jsx
function Card({ children }) {
  return <div className="glass rounded-lg">{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div className="border-b p-4">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="p-4">{children}</div>;
};

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## Performance Optimization

### Avoid Inline Object/Array Creation
```jsx
// ❌ BAD - Creates new object every render
<Component style={{ color: 'red' }} />

// ✅ GOOD - Stable reference
const style = { color: 'red' };
<Component style={style} />
```

### Memoize Child Components
```jsx
const MemoizedChild = memo(ChildComponent);

// Only re-renders when props change
<MemoizedChild data={data} />
```

### Use Keys for Lists
```jsx
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

## Error Handling

### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Try-Catch in Async Functions
```jsx
const fetchData = async () => {
  try {
    setLoading(true);
    const result = await api.getData();
    setData(result);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## Accessibility

### Semantic HTML
```jsx
// ✅ GOOD
<button onClick={handleClick}>Click me</button>
<nav><ul><li>Item</li></ul></nav>

// ❌ BAD
<div onClick={handleClick}>Click me</div>
<div><div>Item</div></div>
```

### ARIA Labels
```jsx
<button aria-label="Close dialog" onClick={onClose}>
  <X className="w-4 h-4" />
</button>
```

### Keyboard Support
```jsx
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleAction}
>
  Action
</div>
```

## Styling with Tailwind

### Consistent Spacing
```jsx
// Use 4px grid: p-4, gap-4, m-4
<div className="p-4 gap-4 space-y-4">
```

### Glass Morphism
```jsx
<div className="glass-strong rounded-lg p-6">
  {/* Transparent panel */}
</div>
```

### Responsive Design
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

### Conditional Classes
```jsx
import { cn } from '../utils/cn';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)}>
```

## Animation with Framer Motion

### Simple Animations
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
  Content
</motion.div>
```

### Staggered Children
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### AnimatePresence for Exit Animations
```jsx
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

## Common Pitfalls to Avoid

### ❌ Don't Mutate State
```jsx
// BAD
state.push(newItem);
setState(state);

// GOOD
setState([...state, newItem]);
```

### ❌ Don't Use Index as Key
```jsx
// BAD
{items.map((item, index) => <Item key={index} />)}

// GOOD
{items.map(item => <Item key={item.id} />)}
```

### ❌ Don't Forget Dependencies
```jsx
// BAD
useEffect(() => {
  doSomething(value);
}, []); // Missing 'value' dependency

// GOOD
useEffect(() => {
  doSomething(value);
}, [value]);
```

### ❌ Don't Create Functions in Render
```jsx
// BAD
<button onClick={() => handleClick(id)}>

// GOOD
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
<button onClick={handleClick}>
```

## Testing Patterns

### Component Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('button click triggers action', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Hook Testing
```jsx
import { renderHook, act } from '@testing-library/react-hooks';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Remember
- Keep components small (< 200 lines)
- One component per file
- Co-locate related files
- Write self-documenting code
- Add PropTypes or TypeScript
- Test user interactions
- Optimize for performance
- Ensure accessibility
