import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Home, Calendar, MapPin } from 'lucide-react';

export default function AnalyticsPanel({ propertyData, prediction }) {
  if (!propertyData || !prediction) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-500">Awaiting analysis...</p>
      </div>
    );
  }

  const factorData = Object.entries(prediction.factors).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: Math.abs(value),
    fill: value >= 0 ? '#10b981' : '#ef4444'
  }));

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 space-y-6">
      {/* Predicted Price */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-medium text-gray-400">ML Predicted Value</h3>
        </div>
        <p className="text-4xl font-bold text-white">
          ${prediction.predictedPrice.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Range: ${prediction.confidenceInterval.low.toLocaleString()} - ${prediction.confidenceInterval.high.toLocaleString()}
        </p>
        <p className="text-xs text-cyan-400 mt-1">
          {(prediction.confidence * 100).toFixed(0)}% Confidence
        </p>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">Square Feet</p>
          </div>
          <p className="text-2xl font-bold">{propertyData.sqFt.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">Year Built</p>
          </div>
          <p className="text-2xl font-bold">{propertyData.yearBuilt}</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Bedrooms / Baths</p>
          <p className="text-2xl font-bold">{propertyData.bedrooms} / {propertyData.bathrooms}</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">Location Score</p>
          </div>
          <p className="text-2xl font-bold">{propertyData.locationScore}/10</p>
        </div>
      </div>

      {/* Price Factors Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-3">Price Factors</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={factorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {factorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
