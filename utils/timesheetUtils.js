// mainfolder / utils / timesheetUtils.js;

import { fetchTimesheetData } from '@/actions/adminActions';
import {
  calculateHoursWorked,
  getLastFourWeeks,
  getStartOfWeek,
} from '@/utils/dateUtils';

async function fetchAndAggregateData() {
  const timesheets = await fetchTimesheetData();
  const userWeeklyHours = {};

  // Process timesheets
  timesheets.forEach((ts) => {
    const date = new Date(ts.date);
    const weekStart = getStartOfWeek(date).toISOString().split('T')[0];

    if (!userWeeklyHours[ts.username]) {
      userWeeklyHours[ts.username] = {
        totalHours: 0,
        weeks: {},
      };
    }

    if (!userWeeklyHours[ts.username].weeks[weekStart]) {
      userWeeklyHours[ts.username].weeks[weekStart] = 0;
    }

    const hoursWorked = calculateHoursWorked(ts.start, ts.end);
    userWeeklyHours[ts.username].weeks[weekStart] += hoursWorked;
    userWeeklyHours[ts.username].totalHours += hoursWorked;
  });

  const lastFourWeeks = getLastFourWeeks();

  const aggregatedData = Object.entries(userWeeklyHours).map(
    ([username, data]) => {
      const weekData = {};
      let totalHours = 0;

      lastFourWeeks.forEach((week) => {
        const weekLabel = `Week of ${week.start}`;
        const hours = data.weeks[week.start] || 0;
        weekData[weekLabel] = hours;
        totalHours += hours;
      });

      return {
        Name: username,
        ...weekData,
        'Total Hours': totalHours.toFixed(2), // Ensure total hours are included
      };
    }
  );

  return aggregatedData;
}

export { fetchAndAggregateData };
