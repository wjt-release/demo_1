import React from 'react';
import Plot from 'react-plotly.js';

const SalesChart = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">销售趋势 (近30天)</h3>
      <div className="w-full h-[350px]">
        <Plot
          data={[
            {
              x: data.dates,
              y: data.sales,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#4f46e5' }, // indigo-600
              line: { shape: 'spline', width: 3 },
              fill: 'tozeroy',
              fillcolor: 'rgba(79, 70, 229, 0.1)',
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 50, r: 20, t: 20, b: 40 },
            showlegend: false,
            xaxis: {
              showgrid: false,
              zeroline: false,
              tickfont: { color: '#6b7280' },
            },
            yaxis: {
              showgrid: true,
              gridcolor: '#f3f4f6',
              zeroline: false,
              tickfont: { color: '#6b7280' },
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'inherit' },
            hovermode: 'x unified',
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </div>
  );
};

export default SalesChart;
