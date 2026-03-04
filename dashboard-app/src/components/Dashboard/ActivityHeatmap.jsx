import React from 'react';
import Plot from 'react-plotly.js';

const ActivityHeatmap = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">用户活跃度热力图 (日-小时)</h3>
      <div className="w-full h-[400px]">
        <Plot
          data={[
            {
              x: data.hours,
              y: data.days,
              z: data.z,
              type: 'heatmap',
              colorscale: [
                [0, '#e0e7ff'],
                [0.5, '#6366f1'],
                [1, '#312e81']
              ],
              showscale: true,
              xgap: 2,
              ygap: 2,
              hoverongaps: false,
              hovertemplate: '<b>%{y} %{x}</b><br>活跃度: %{z}<extra></extra>',
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 50, r: 20, t: 20, b: 50 },
            xaxis: {
              tickfont: { size: 10, color: '#6b7280' },
              side: 'bottom',
            },
            yaxis: {
              autorange: 'reversed', // Monday at top
              tickfont: { color: '#6b7280' },
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'inherit' },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </div>
  );
};

export default ActivityHeatmap;
