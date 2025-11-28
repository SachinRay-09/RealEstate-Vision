# Agent Orchestrator - Design

## Architecture

### Component Diagram
```
useAgentOrchestrator Hook
├── State Management
│   ├── analysisState: 'idle' | 'scanning' | 'analyzing' | 'complete'
│   ├── agentStatus: Map<AgentName, AgentStatus>
│   └── results: AggregatedResults
├── Agent Coordination
│   ├── startAnalysis(address: string)
│   ├── updateAgentStatus(agent, status)
│   └── aggregateResults()
└── Public API
    ├── state: AnalysisState
    ├── agentStatus: AgentStatusMap
    ├── results: Results | null
    ├── analyzeProperty: (address: string) => Promise<void>
    └── reset: () => void
```

## Data Structures

### AnalysisState
```typescript
type AnalysisState = 'idle' | 'scanning' | 'analyzing' | 'complete' | 'error';
```

### AgentStatus
```typescript
interface AgentStatus {
  status: 'idle' | 'running' | 'complete' | 'error';
  progress?: number;  // 0-100 for reconstruction agent
  message?: string;   // Status message
  data?: any;        // Agent-specific data
  error?: Error;     // Error if failed
}
```

### Results
```typescript
interface Results {
  address: string;
  coordinates: { lat: number; lng: number; zoom: number };
  modelData: { modelPath: string; pointCount: number; meshQuality: string };
  propertyData: PropertyData;
  prediction: PricePrediction;
  tourPoints: TourPoint[];
}
```

## Correctness Properties

### CP-1: State Consistency
**Property**: Analysis state accurately reflects agent states  
**Verification**: 
- If any agent is 'running', state is 'scanning' or 'analyzing'
- If all agents are 'complete', state is 'complete'
- If any agent has 'error', state can be 'error'

**Covers**: AC-1.3, AC-2.1

### CP-2: Progress Accuracy
**Property**: Progress values are monotonically increasing  
**Verification**:
- Progress never decreases
- Progress reaches 100% when complete
- Progress updates trigger UI re-renders

**Covers**: AC-2.2

### CP-3: Result Completeness
**Property**: Results contain data from all agents  
**Verification**:
- Results object has all required fields
- No null/undefined values when complete
- Data types match specifications

**Covers**: AC-3.1, AC-3.2, AC-3.3, AC-3.4

### CP-4: Error Handling
**Property**: Errors don't crash the application  
**Verification**:
- Try-catch blocks around async operations
- Error states properly set
- User-friendly error messages
- Recovery possible via reset

**Covers**: NFR-2.1, NFR-2.3

### CP-5: Parallel Execution
**Property**: Agents run concurrently, not sequentially  
**Verification**:
- All agents start within 100ms of each other
- Total time < sum of individual times
- No blocking operations

**Covers**: AC-1.3, NFR-1.1

## Implementation Strategy

### Phase 1: State Setup
```javascript
const [state, setState] = useState('idle');
const [agentStatus, setAgentStatus] = useState({
  reconstruction: { status: 'idle', progress: 0 },
  market: { status: 'idle' },
  valuation: { status: 'idle' },
  satellite: { status: 'idle' },
  tour: { status: 'idle' }
});
const [results, setResults] = useState(null);
```

### Phase 2: Agent Coordination
```javascript
const analyzeProperty = async (address) => {
  setState('scanning');
  
  // Start all agents in parallel
  const [
    satelliteData,
    reconstructionData,
    marketData,
    valuationData,
    tourData
  ] = await Promise.all([
    runSatelliteAgent(address),
    runReconstructionAgent(address),
    runMarketAgent(address),
    runValuationAgent(address),
    runTourAgent(address)
  ]);
  
  // Aggregate results
  setResults({ /* combined data */ });
  setState('complete');
};
```

### Phase 3: Progress Updates
```javascript
const updateAgentStatus = (agent, updates) => {
  setAgentStatus(prev => ({
    ...prev,
    [agent]: { ...prev[agent], ...updates }
  }));
};
```

## Testing Strategy

### Unit Tests
- State transitions
- Agent status updates
- Result aggregation
- Error handling

### Integration Tests
- Full analysis flow
- Parallel execution
- Progress tracking
- Reset functionality

### Performance Tests
- Analysis completion time
- Memory usage
- UI responsiveness
- Concurrent analyses

## Edge Cases

### EC-1: Invalid Address
**Scenario**: User enters gibberish  
**Handling**: Use default coordinates, show warning

### EC-2: Network Failure
**Scenario**: API calls fail  
**Handling**: Use mock data, show offline indicator

### EC-3: Partial Failure
**Scenario**: Some agents succeed, others fail  
**Handling**: Show partial results, indicate failures

### EC-4: Rapid Reset
**Scenario**: User resets during analysis  
**Handling**: Cancel pending operations, clean state

## Performance Optimizations

### PO-1: Memoization
```javascript
const memoizedResults = useMemo(() => 
  processResults(results), 
  [results]
);
```

### PO-2: Debouncing
```javascript
const debouncedAnalyze = useMemo(
  () => debounce(analyzeProperty, 300),
  []
);
```

### PO-3: Lazy Loading
```javascript
const agents = {
  reconstruction: () => import('./agents/ReconstructionAgent'),
  // ... other agents
};
```

## Security Considerations

### SC-1: Input Validation
- Sanitize address input
- Validate coordinates
- Check data types

### SC-2: Error Messages
- Don't expose internal details
- User-friendly messages
- Log details server-side

### SC-3: Rate Limiting
- Prevent spam analyses
- Throttle requests
- Queue management

## Accessibility

### A11Y-1: Status Announcements
- Use aria-live for status updates
- Announce completion
- Describe errors clearly

### A11Y-2: Progress Indication
- Visual progress bars
- Text percentage
- Time estimates

### A11Y-3: Keyboard Support
- Tab navigation
- Enter to analyze
- Escape to cancel
