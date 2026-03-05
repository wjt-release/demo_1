import React from 'react';
import { activityHeatmapData, daysOfWeek, hours } from '../data/mockData';

const ActivityHeatmap = () => {
  const getColor = (value) => {
    if (value === 0) return 'bg-gray-100';
    if (value < 20) return 'bg-blue-100';
    if (value < 40) return 'bg-blue-200';
    if (value < 60) return 'bg-blue-400';
    if (value < 80) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        User Activity Heatmap (Day vs Hour)
      </h3>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="grid grid-cols-[auto_repeat(24,minmax(20px,1fr))] gap-1 text-xs">
            {/* Header Row (Hours) */}
            <div className="h-6"></div> {/* Empty corner */}
            {hours.map((hour) => (
              <div key={hour} className="text-center text-gray-500 font-medium">
                {hour}
              </div>
            ))}

            {/* Rows (Days) */}
            {daysOfWeek.map((day, dayIndex) => (
              <React.Fragment key={day}>
                {/* Day Label */}
                <div className="flex items-center justify-end pr-2 text-gray-500 font-medium h-8">
                  {day}
                </div>
                {/* Heatmap Cells */}
                {hours.map((hour) => {
                  const cellData = activityHeatmapData[dayIndex][hour];
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`h-8 w-full rounded-sm ${getColor(cellData.value)} transition-colors hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 cursor-pointer`}
                      title={`${day} ${hour}:00 - Activity: ${cellData.value}`}
                    ></div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end text-xs text-gray-500 space-x-2">
        <span>Less</span>
        <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
        <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
        <div className="w-3 h-3 bg-blue-800 rounded-sm"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
