import { useState, useCallback } from 'react';
import { ReconstructionAgent } from '../agents/ReconstructionAgent';
import { MarketAnalystAgent } from '../agents/MarketAnalystAgent';
import { MLValuationAgent } from '../agents/MLValuationAgent';
import { SatelliteAgent } from '../agents/SatelliteAgent';
import { VirtualTourAgent } from '../agents/VirtualTourAgent';

export const useAgentOrchestrator = () => {
  const [state, setState] = useState('idle'); // idle -> scanning -> analyzing -> complete
  const [agentStatus, setAgentStatus] = useState({
    reconstruction: { status: 'idle', progress: 0, message: '' },
    market: { status: 'idle', data: null },
    valuation: { status: 'idle', prediction: null },
    satellite: { status: 'idle', coordinates: null },
    tour: { status: 'idle', tourPoints: [] }
  });
  const [results, setResults] = useState(null);

  const updateAgentStatus = useCallback((agent, updates) => {
    setAgentStatus(prev => ({
      ...prev,
      [agent]: { ...prev[agent], ...updates }
    }));
  }, []);

  const analyzeProperty = useCallback(async (address) => {
    setState('scanning');
    setResults(null);

    try {
      // Agent 4: Satellite (runs first for visual impact)
      updateAgentStatus('satellite', { status: 'running' });
      const satelliteAgent = new SatelliteAgent();
      const coordinates = await satelliteAgent.getCoordinates(address);
      updateAgentStatus('satellite', { status: 'complete', coordinates });

      // Agent 1: Reconstruction (with progress updates)
      updateAgentStatus('reconstruction', { status: 'running' });
      const reconstructionAgent = new ReconstructionAgent();
      reconstructionAgent.onProgress = ({ message, percent }) => {
        updateAgentStatus('reconstruction', { progress: percent, message });
      };
      const modelData = await reconstructionAgent.process(address);
      updateAgentStatus('reconstruction', { status: 'complete', data: modelData });

      setState('analyzing');

      // Agent 2: Market Data
      updateAgentStatus('market', { status: 'running' });
      const marketAgent = new MarketAnalystAgent();
      const propertyData = await marketAgent.fetchData(address);
      updateAgentStatus('market', { status: 'complete', data: propertyData });

      // Agent 3: ML Valuation
      updateAgentStatus('valuation', { status: 'running' });
      const mlAgent = new MLValuationAgent();
      const prediction = mlAgent.predict(propertyData);
      updateAgentStatus('valuation', { status: 'complete', prediction });

      // Agent 5: Virtual Tour
      updateAgentStatus('tour', { status: 'running' });
      const tourAgent = new VirtualTourAgent();
      const tourPoints = tourAgent.generateTourPoints(modelData);
      updateAgentStatus('tour', { status: 'complete', tourPoints });

      setState('complete');
      setResults({
        address,
        coordinates,
        modelData,
        propertyData,
        prediction,
        tourPoints
      });

    } catch (error) {
      console.error('Orchestration error:', error);
      setState('error');
    }
  }, [updateAgentStatus]);

  const reset = useCallback(() => {
    setState('idle');
    setAgentStatus({
      reconstruction: { status: 'idle', progress: 0, message: '' },
      market: { status: 'idle', data: null },
      valuation: { status: 'idle', prediction: null },
      satellite: { status: 'idle', coordinates: null },
      tour: { status: 'idle', tourPoints: [] }
    });
    setResults(null);
  }, []);

  return {
    state,
    agentStatus,
    results,
    analyzeProperty,
    reset
  };
};
