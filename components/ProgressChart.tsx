
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProgressLog } from '../types';

interface ProgressChartProps {
  data: ProgressLog[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const formattedData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(log => ({
      ...log,
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

  return (
    <div className="bg-brand-gray p-4 md:p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Weight Progress (lbs)</h3>
      {formattedData.length > 1 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#d1d5db" />
            <YAxis stroke="#d1d5db" domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderColor: '#374151',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#059669" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          <p>Log at least two weigh-ins to see your progress chart.</p>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
