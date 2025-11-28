import { DollarSign, TrendingUp, Home, Calendar, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function ValuationCard({ propertyData, prediction }) {
  if (!propertyData || !prediction) {
    return (
      <div className="glass-strong rounded-lg p-6 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-12 h-12 text-cyan-500 mx-auto mb-3 animate-pulse" />
          <p className="text-sm text-gray-400 uppercase tracking-wider">AWAITING DATA</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-lg overflow-hidden"
    >
      {/* Header with glowing effect */}
      <div className="relative bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 border-b border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent animate-pulse" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              AI VALUATION
            </span>
          </div>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-white text-glow"
          >
            ${prediction.predictedPrice.toLocaleString()}
          </motion.div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-xs text-gray-400">
              Range: ${prediction.confidenceInterval.low.toLocaleString()} - ${prediction.confidenceInterval.high.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 terminal-text">
              {(prediction.confidence * 100).toFixed(0)}% CONFIDENCE
            </span>
          </div>
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <DataPoint
            icon={Home}
            label="AREA"
            value={`${propertyData.sqFt.toLocaleString()} ft²`}
            color="cyan"
          />
          <DataPoint
            icon={Calendar}
            label="BUILT"
            value={propertyData.yearBuilt}
            color="cyan"
          />
          <DataPoint
            icon={TrendingUp}
            label="BEDS/BATHS"
            value={`${propertyData.bedrooms}/${propertyData.bathrooms}`}
            color="cyan"
          />
          <DataPoint
            icon={MapPin}
            label="LOCATION"
            value={`${propertyData.locationScore}/10`}
            color="cyan"
          />
        </div>

        {/* Price Factors */}
        <div className="pt-4 border-t border-white/10">
          <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
            VALUATION FACTORS
          </div>
          <div className="space-y-2">
            {Object.entries(prediction.factors).map(([key, value]) => {
              const isPositive = value >= 0;
              const percentage = Math.abs(value) / prediction.predictedPrice * 100;
              
              return (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 uppercase tracking-wider">
                      {key}
                    </span>
                    <span className={cn(
                      'font-semibold terminal-text',
                      isPositive ? 'text-green-400' : 'text-red-400'
                    )}>
                      {isPositive ? '+' : ''}{Math.abs(value).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-800 rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={cn(
                        'h-full',
                        isPositive ? 'bg-green-500' : 'bg-red-500'
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DataPoint({ icon: Icon, label, value, color = 'cyan' }) {
  return (
    <div className="glass rounded p-3 border border-white/10">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-3 h-3 text-${color}-400`} />
        <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}
