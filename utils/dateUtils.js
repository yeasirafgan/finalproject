// // //mainfolder/utils/dateUtils.js

import {
  startOfWeek,
  endOfWeek,
  format,
  differenceInMinutes,
  addDays,
  subWeeks,
} from 'date-fns';

// Get the start and end date of the week
export function getWeeklyPeriod(date) {
  const start = startOfWeek(new Date(date), { weekStartsOn: 1 }); // Week starts on Monday
  const end = endOfWeek(start, { weekStartsOn: 1 });

  return {
    startDate: format(start, 'yyyy-MM-dd'),
    endDate: format(end, 'yyyy-MM-dd'),
  };
}

// Get the last four weeks starting from today
export function getLastFourWeeks() {
  const today = new Date();
  const weeks = [];

  for (let i = 0; i < 4; i++) {
    const start = startOfWeek(subWeeks(today, i), { weekStartsOn: 1 });
    const end = endOfWeek(start, { weekStartsOn: 1 });

    weeks.push({
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    });
  }

  return weeks.reverse();
}

// Calculate hours worked between two times
export function calculateHoursWorked(start, end) {
  const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
    return new Date(1970, 0, 1, hours, minutes);
  };

  const startDate = parseTime(start);
  const endDate = parseTime(end);

  let endDateAdjusted = endDate;
  if (endDate < startDate) {
    endDateAdjusted = addDays(endDate, 1);
  }

  const minutesWorked = differenceInMinutes(endDateAdjusted, startDate);

  const hours = Math.floor(minutesWorked / 60);
  const minutes = minutesWorked % 60;

  const decimalMinutes = minutes / 100;
  const totalHours = hours + decimalMinutes;

  return parseFloat(totalHours.toFixed(2));
}

// Get the start and end dates of the previous week
export function getPreviousWeek(date) {
  const start = startOfWeek(subWeeks(date, 1), { weekStartsOn: 1 });
  const end = endOfWeek(start, { weekStartsOn: 1 });
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
}

export function formatDate(date) {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid date:', date);
    return 'Invalid Date';
  }
  return format(parsedDate, 'dd MMM');
}

/**
 * Get the start date of the week for a given date. Assumes the week starts on Monday.
 * @param {Date} date - The date for which to find the start of the week.
 * @returns {Date} - The start date of the week.
 */
export function getStartOfWeek(date) {
  const dayOfWeek = date.getDay();
  const distanceToMonday = (dayOfWeek + 6) % 7; // Calculate distance to Monday
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - distanceToMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

export function calculateTotalMinutes(timesheets) {
  const totalMinutes = timesheets.reduce((sum, ts) => {
    const minutesWorked = calculateMinutesWorked(ts.start, ts.end);
    return sum + minutesWorked;
  }, 0);

  return totalMinutes;
}

export function calculateMinutesWorked(start, end) {
  const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
    return new Date(1970, 0, 1, hours, minutes);
  };

  const startDate = parseTime(start);
  const endDate = parseTime(end);

  let endDateAdjusted = endDate;
  if (endDate < startDate) {
    endDateAdjusted = addDays(endDate, 1);
  }

  const minutesWorked = differenceInMinutes(endDateAdjusted, startDate);
  return minutesWorked;
}

export function convertMinutesToHours(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}
