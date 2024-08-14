// // mainfolder/utils/dateUtils.js

export function getCurrentWeekPeriod() {
  const now = new Date();
  return getWeeklyPeriod(now);
}

export function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1); // January 1st
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}

export function get4WeeklyPeriod(date) {
  // Example logic for 4-week period calculation
  const startDate = new Date(date.getFullYear(), 0, 1); // Start of the year
  const weekNumber = Math.ceil((date - startDate) / (1000 * 60 * 60 * 24 * 7));
  return Math.ceil(weekNumber / 4); // Calculate 4-week period
}

export function getLastFourWeeks() {
  const weeks = [];
  const now = new Date();

  for (let i = 0; i < 4; i++) {
    const end = new Date(now);
    end.setDate(end.getDate() - (end.getDay() === 0 ? 6 : end.getDay() - 1));
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    weeks.push({ start, end });
    now.setDate(now.getDate() - 7);
  }

  return weeks;
}

export const getWeekDateRange = (startDate) => {
  const startOfWeek = startDate;
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return { startOfWeek, endOfWeek };
};

export function getWeeklyPeriod(date) {
  const startDate = new Date(date);
  const endDate = new Date(date);

  startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of the week (Sunday)
  endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)

  return { startDate, endDate };
}

const getWeekStartDate = (date) => {
  const dayOfWeek = date.getDay(); // Returns 0 for Sunday, 1 for Monday, etc.
  // Adjust to Monday as the start of the week
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // If it's Sunday (0), we need to go back 6 days
  const startOfWeek = new Date(date.setDate(diff));
  return startOfWeek;
};

const getWeekEndDate = (date) => {
  const startOfWeek = getWeekStartDate(date); // Get the start of the week (Monday)
  const endOfWeek = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6)); // Add 6 days to get the end of the week (Sunday)
  return endOfWeek;
};

export const getLastFourWeeksDateRanges = (currentDate) => {
  const dateRanges = [];

  // Create a copy of the current date to avoid mutating the original
  let date = new Date(currentDate);

  // Find the Monday of the current week
  const dayOfWeek = date.getDay();
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  date.setDate(date.getDate() + offset);

  for (let i = 0; i < 4; i++) {
    const end = new Date(date);
    const start = new Date(date);
    start.setDate(start.getDate() - 6); // Monday to Sunday

    dateRanges.push({ start, end });

    // Move to the previous week
    date.setDate(date.getDate() - 7);
  }

  return dateRanges;
};

export function calculateHoursWorked(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const start = new Date();
  start.setHours(startHour, startMinute);
  const end = new Date();
  end.setHours(endHour, endMinute);

  const diffMs = end - start;
  const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
  return Math.round(diffHours * 100) / 100; // Round to 2 decimal places
}

export const formatDate = (date) => {
  if (!date) return '';

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error('Invalid date');

    const options = { day: 'numeric', month: 'short' };
    return d.toLocaleDateString('en-US', options).replace(/,/g, '');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};
