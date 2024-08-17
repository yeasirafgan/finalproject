//mainfolder/utils/dateUtils.js

export function getWeeklyPeriod(date) {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    startDate: startOfWeek.toISOString().split('T')[0], // Format as YYYY-MM-DD
    endDate: endOfWeek.toISOString().split('T')[0], // Format as YYYY-MM-DD
  };
}

export function getStartOfWeek(date) {
  const current = new Date(date);
  const day = current.getUTCDay();
  const difference = current.getUTCDate() - day + (day === 0 ? -6 : 1);
  current.setUTCDate(difference);
  current.setUTCHours(0, 0, 0, 0); // Normalizing time to midnight for consistency
  return current;
}

export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
  const month = date.toLocaleString('default', { month: 'short' }); // Get short month name

  return `${day} ${month}`;
}

export function getLastFourWeeks() {
  const weeks = [];
  const today = new Date();
  const todayStartOfWeek = getStartOfWeek(today);

  for (let i = 0; i < 4; i++) {
    // Calculate the start of the week
    const startOfWeek = new Date(todayStartOfWeek);
    startOfWeek.setDate(todayStartOfWeek.getDate() - i * 7);

    // Calculate the end of the week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    // Push the week data
    weeks.push({
      start: startOfWeek.toISOString().split('T')[0], // Format as YYYY-MM-DD
      end: endOfWeek.toISOString().split('T')[0], // Format as YYYY-MM-DD
    });
  }

  return weeks;
}

// export function calculateHoursWorked(start, end) {
//   const startDate = new Date(`1970-01-01T${start}:00Z`);
//   const endDate = new Date(`1970-01-01T${end}:00Z`);

//   // If end time is before start time, assume it is on the next day
//   if (endDate < startDate) {
//     endDate.setDate(endDate.getDate() + 1);
//   }

//   const differenceInMilliseconds = endDate - startDate;
//   const hours = differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

//   return parseFloat(hours.toFixed(2)); // Round to two decimal places
// }

// utils/dateUtils.js

// utils/dateUtils.js

export const normalizeTime = (time) => {
  // Check if the time is in the format HH:mm or H:mm
  if (time.includes(':')) {
    // If the time already includes ':', assume it is in HH:mm or H:mm format
    const [hours, minutes] = time.split(':').map((num) => num.padStart(2, '0'));
    return `${hours}:${minutes}`;
  } else if (time.length === 1) {
    // If the time is a single digit, assume it is H (e.g., '8') and pad it to HH:mm format
    return `0${time}:00`;
  } else if (time.length === 2) {
    // If the time is two digits, assume it is HH (e.g., '08') and pad minutes to '00'
    return `${time}:00`;
  } else if (time.length === 3) {
    // If the time is three digits, assume it is HMM (e.g., '830') and convert it to HH:mm
    return `${time.slice(0, 1)}${time.slice(1, 3)}:00`;
  } else if (time.length === 4) {
    // If the time is four digits, assume it is HHMM (e.g., '0830') and convert it to HH:mm
    return `${time.slice(0, 2)}:${time.slice(2)}`;
  }
  return '00:00'; // Default value if the format is not recognized
};

// utils/dateUtils.js

export const calculateHoursWorked = (start, end) => {
  const [startHours, startMinutes] = normalizeTime(start)
    .split(':')
    .map(Number);
  const [endHours, endMinutes] = normalizeTime(end).split(':').map(Number);

  const startDate = new Date(1970, 0, 1, startHours, startMinutes);
  const endDate = new Date(1970, 0, 1, endHours, endMinutes);

  const diff = endDate - startDate; // Difference in milliseconds

  if (diff < 0) {
    // Handle cases where end time is the next day
    return (24 * 60 * 60 * 1000 + diff) / (60 * 60 * 1000); // Adding 24 hours in milliseconds
  }

  return diff / (60 * 60 * 1000); // Convert milliseconds to hours
};
