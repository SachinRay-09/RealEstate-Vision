import { Eye, TrendingUp, Brain, Satellite, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const agentIcons = {
  reconstruction: Eye,
  market: TrendingUp,
  valuation: Brain,
  satellite: Satellite,
  tour: Navigation
};

const agentNames = {
  reconstruction: 'RECONSTRUCTION',
  market: 'MARKET INTEL',
  valuation: 'VALUATION AI',
  satellite: 'ORBITAL SCAN',
  tour: 'NAVIGATION'
};

const agentMessages = {
  reconstruction: {
    running: 'GENERATING POINT CLOUD...',
    complete: 'MESH RECONSTRUCTION COMPLETE'
  },
  market: {
    running: 'ANALYZING MARKET DATA...',
    complete: 'MARKET ANALYSIS COMPLETE'
  },
  valuation: {
    running: 'COMPUTING VALUATION...',
    complete: 'VALUATION COMPUTED'
  },
  satellite: {
    running: 'ACQUIRING SATELLITE LOCK...',
    complete: 'COORDINATES LOCKED'
  },
  tour: {
    running: 'MAPPING WAYPOINTS...',
    complete: 'TOUR PATH GENERATED'
  }
};

export default function AgentTerminal({ agentStatus }) {
  return (
    <div className="glass-strong rounded-lg p-4 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-cyan-500/30">
        <h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
          AGENT INTELLIGENCE
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-300 terminal-text">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Agent Feed */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20">
        {Object.entries(agentStatus).map(([key, status]) => {
          const Icon = agentIcons[key];
          const isActive = status.status === 'running';
          const isComplete = status.status === 'complete';
          const message = status.message || agentMessages[key]?.[status.status] || '';
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                'p-3 rounded border transition-all duration-300',
                isActive && 'border-cyan-500/50 bg-cyan-500/5',
                isComplete && 'border-green-500/50 bg-green-500/5',
                !isActive && !isComplete && 'border-white/5 bg-white/5'
              )}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn(
                  'p-2 rounded',
                  isActive && 'bg-cyan-500/20 animate-pulse',
                  isComplete && 'bg-green-500/20',
                  !isActive && !isComplete && 'bg-gray-500/20'
                )}>
                  <Icon className={cn(
                    'w-4 h-4',
                    isActive && 'text-cyan-400',
                    isComplete && 'text-green-400',
                    !isActive && !isComplete && 'text-gray-500'
                  )} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold tracking-wider text-white uppercase">
                      {agentNames[key]}
                    </span>
                    <span className={cn(
                      'text-xs terminal-text',
                      isActive && 'text-cyan-400',
                      isComplete && 'text-green-400',
                      !isActive && !isComplete && 'text-gray-500'
                    )}>
                      {isActive && '⚡ ACTIVE'}
                      {isComplete && '✓ DONE'}
                      {!isActive && !isComplete && '○ IDLE'}
                    </span>
                  </div>

                  {/* Message with typing effect */}
                  {message && (
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={message}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-gray-300 terminal-text truncate"
                      >
                        {message}
                      </motion.p>
                    </AnimatePresence>
                  )}

                  {/* Progress bar for reconstruction */}
                  {key === 'reconstruction' && status.progress > 0 && (
                    <div className="mt-2 bg-slate-800 rounded-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${status.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Active</div>
          <div className="text-lg font-bold text-cyan-400">
            {Object.values(agentStatus).filter(s => s.status === 'running').length}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Complete</div>
          <div className="text-lg font-bold text-green-400">
            {Object.values(agentStatus).filter(s => s.status === 'complete').length}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total</div>
          <div className="text-lg font-bold text-white">
            {Object.keys(agentStatus).length}
          </div>
        </div>
      </div>
    </div>
  );
}
