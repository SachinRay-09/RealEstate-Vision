import { Eye, TrendingUp, Brain, Satellite, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const agentIcons = {
  reconstruction: Eye,
  market: TrendingUp,
  valuation: Brain,
  satellite: Satellite,
  tour: Navigation
};

const agentNames = {
  reconstruction: 'The Eye',
  market: 'The Analyst',
  valuation: 'The Brain',
  satellite: 'The Scout',
  tour: 'The Guide'
};

export default function AgentStatusPanel({ agentStatus }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400">Agent Status</h3>
      
      <div className="space-y-3">
        {Object.entries(agentStatus).map(([key, status]) => {
          const Icon = agentIcons[key];
          const isActive = status.status === 'running';
          const isComplete = status.status === 'complete';
          
          return (
            <motion.div
              key={key}
              className={`p-3 rounded-lg border ${
                isActive ? 'border-cyan-500 bg-cyan-500/10' :
                isComplete ? 'border-green-500 bg-green-500/10' :
                'border-slate-700 bg-slate-800/50'
              }`}
              animate={isActive ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-cyan-400 animate-pulse' :
                    isComplete ? 'text-green-400' :
                    'text-gray-500'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{agentNames[key]}</p>
                    {status.message && (
                      <p className="text-xs text-gray-400">{status.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-xs">
                  {isActive && '⚡'}
                  {isComplete && '✓'}
                  {status.status === 'idle' && '○'}
                </div>
              </div>
              
              {key === 'reconstruction' && status.progress > 0 && (
                <div className="mt-2 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${status.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
