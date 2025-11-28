import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentOrchestrator } from './hooks/useAgentOrchestrator';
import CinematicSearch from './components/dashboard/CinematicSearch';
import AgentTerminal from './components/dashboard/AgentTerminal';
import ValuationCard from './components/dashboard/ValuationCard';
import ModelViewer from './components/3d/ModelViewer';
import SatelliteBackground from './components/map/SatelliteBackground';
import SatelliteViewPanel from './components/map/SatelliteViewPanel';
import { RotateCcw, Maximize2, Activity, Satellite, Box } from 'lucide-react';

function App() {
  const { state, agentStatus, results, analyzeProperty, reset } = useAgentOrchestrator();
  const [isVRMode, setIsVRMode] = useState(false);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'satellite'

  const isLoading = state === 'scanning' || state === 'analyzing';
  const isComplete = state === 'complete';
  const isIdle = state === 'idle';

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Satellite Background - Always visible at z-0 */}
      <SatelliteBackground
        coordinates={results?.coordinates}
        isActive={agentStatus.satellite?.status === 'running'}
      />

      {/* Hero Mode - Before Analysis */}
      {isIdle && (
        <div className="relative z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <CinematicSearch
              onAnalyze={analyzeProperty}
              isLoading={isLoading}
              disabled={isLoading}
              isHero={true}
            />
          </div>
        </div>
      )}

      {/* Dashboard Mode - During/After Analysis */}
      {!isIdle && (
        <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
          {/* Top Bar */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong border-b border-cyan-500/30 px-6 py-3 pointer-events-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                <div>
                  <h1 className="text-lg font-bold tracking-wider text-white uppercase">
                    REALESTATE VISION
                  </h1>
                  <p className="text-xs text-gray-400 terminal-text">
                    ORBITAL INTELLIGENCE SYSTEM
                  </p>
                </div>
              </div>

              {isComplete && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-300 transition-colors font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">
                    New Scan
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Main Dashboard Layout */}
          <div className="flex-1 flex gap-4 p-4 overflow-hidden">
            {/* Left Panel - Agent Intelligence */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-80 flex-shrink-0 pointer-events-auto"
            >
              <AgentTerminal agentStatus={agentStatus} />
            </motion.div>

            {/* Center - 3D Viewer / Satellite View */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 bg-slate-900/50 rounded-lg overflow-hidden relative pointer-events-auto border border-white/10"
            >
              {isComplete ? (
                <>
                  {/* View Toggle Buttons */}
                  <div className="absolute top-4 left-4 glass rounded-lg flex gap-2 p-1 z-10">
                    <button
                      onClick={() => setViewMode('3d')}
                      className={`px-4 py-2 rounded flex items-center gap-2 transition-all ${
                        viewMode === '3d'
                          ? 'bg-cyan-400 text-black'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <Box className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">3D Model</span>
                    </button>
                    <button
                      onClick={() => setViewMode('satellite')}
                      className={`px-4 py-2 rounded flex items-center gap-2 transition-all ${
                        viewMode === 'satellite'
                          ? 'bg-cyan-400 text-black'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <Satellite className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Satellite</span>
                    </button>
                  </div>

                  {/* View Content */}
                  <AnimatePresence mode="wait">
                    {viewMode === '3d' ? (
                      <motion.div
                        key="3d"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                      >
                        <ModelViewer
                          modelPath={results.modelData.modelPath}
                          isVRMode={isVRMode}
                        />
                        
                        {/* VR Toggle */}
                        <button
                          onClick={() => setIsVRMode(!isVRMode)}
                          className="absolute top-4 right-4 glass rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors z-10"
                        >
                          <Maximize2 className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs text-white uppercase tracking-wider">
                            {isVRMode ? 'Exit VR' : 'VR Mode'}
                          </span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="satellite"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                      >
                        <SatelliteViewPanel coordinates={results?.coordinates} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900/30">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full" />
                      <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-cyan-400 text-sm uppercase tracking-widest terminal-text">
                      {state === 'scanning' ? 'SCANNING STRUCTURE...' : 'ANALYZING DATA...'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Panel - Valuation */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-96 flex-shrink-0 pointer-events-auto"
            >
              <ValuationCard
                propertyData={results?.propertyData}
                prediction={results?.prediction}
              />
            </motion.div>
          </div>

          {/* Bottom Bar - Search */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-6 pb-4 pointer-events-auto"
          >
            <CinematicSearch
              onAnalyze={analyzeProperty}
              isLoading={isLoading}
              disabled={isLoading}
              isHero={false}
            />
          </motion.div>
        </div>
      )}

      {/* Status Indicators */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 left-6 glass-strong rounded-lg px-6 py-3 flex items-center gap-3 z-50 pointer-events-none"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm text-white terminal-text uppercase tracking-wider">
              {state === 'scanning' ? 'ORBITAL SCAN IN PROGRESS' : 'PROCESSING INTELLIGENCE'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
