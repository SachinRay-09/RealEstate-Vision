import { useState } from 'react';
import { Search, Loader2, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function CinematicSearch({ onAnalyze, isLoading, disabled, isHero = false }) {
  const [address, setAddress] = useState('123 Main St');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim() && !isLoading) {
      onAnalyze(address.trim());
    }
  };

  if (isHero) {
    // Hero mode - center of screen before analysis
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-5xl font-bold text-white mb-3 text-glow">
            REALESTATE VISION
          </h1>
          <p className="text-gray-300 text-lg tracking-wider uppercase">
            AI-Powered Property Intelligence System
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-2 flex items-center gap-3 shadow-2xl border border-white/20">
            <Search className="w-6 h-6 text-cyan-400 ml-4 flex-shrink-0" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter target address..."
              disabled={disabled || isLoading}
              style={{ color: '#ffffff', caretColor: '#00E5FF' }}
              className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-lg py-4 px-2 font-medium"
            />
            <button
              type="submit"
              disabled={disabled || isLoading || !address.trim()}
              className={cn(
                'px-8 py-4 rounded font-bold tracking-widest uppercase transition-all flex-shrink-0',
                'bg-cyan-400 text-black',
                'hover:bg-cyan-300',
                'disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed',
                'shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  ANALYZING
                </span>
              ) : (
                'INITIATE SCAN'
              )}
            </button>
          </div>
          <p className="text-xs text-gray-300 text-center mt-4 terminal-text">
            ENTER COORDINATES OR ADDRESS • DEMO MODE ACTIVE
          </p>
        </form>
      </motion.div>
    );
  }

  // Compact mode - bottom of screen during analysis
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-black/80 backdrop-blur-md rounded-lg p-2 flex items-center gap-3 shadow-xl border border-white/20"
    >
      <Search className="w-5 h-5 text-cyan-400 ml-3 flex-shrink-0" />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter target address..."
        disabled={disabled || isLoading}
        style={{ color: '#ffffff', caretColor: '#00E5FF' }}
        className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 py-3 px-2 font-medium"
      />
      <button
        type="submit"
        disabled={disabled || isLoading || !address.trim()}
        className={cn(
          'px-6 py-3 rounded font-bold tracking-widest uppercase transition-all text-sm flex-shrink-0',
          'bg-cyan-400 text-black',
          'hover:bg-cyan-300',
          'disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed',
          'shadow-[0_0_15px_rgba(34,211,238,0.5)]'
        )}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            SCANNING
          </span>
        ) : (
          'ANALYZE'
        )}
      </button>
    </motion.form>
  );
}
