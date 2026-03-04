import React from 'react';
import Plot from 'react-plotly.js';

const RegionChart = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">地区分布</h3>
      <div className="w-full h-[350px]">
        <Plot
          data={[
            {
              labels: data.provinces,
              values: data.values,
              type: 'pie',
              hole: 0.4, // Donut chart
              textinfo: 'percent',
              hoverinfo: 'label+value+percent',
              marker: {
                // Tailwind colors: indigo-600 to 100, pink-500...
                colors: [
                  '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe',
                  '#ec4899', '#f472b6', '#fb7185', '#fda4af', '#e5e7eb'
                ]
              },
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 20, r: 20, t: 0, b: 20 },
            showlegend: true,
            legend: { 
              orientation: 'v', 
              x: 1, 
              y: 0.5,
              font: { size: 12, color: '#4b5563' }
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

export default RegionChart;
