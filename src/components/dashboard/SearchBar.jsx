import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ onAnalyze, isLoading, disabled }) {
  const [address, setAddress] = useState('123 Main St');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim() && !isLoading) {
      onAnalyze(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter property address..."
          disabled={disabled || isLoading}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pl-12 pr-32 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        
        <button
          type="submit"
          disabled={disabled || isLoading || !address.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-2 rounded-md font-medium transition-all disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Try: "123 Main St" or enter any address (demo uses mock data)
      </p>
    </form>
  );
}
