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

// export const calculateHoursWorked = (start, end) => {
//   // Helper function to normalize time
//   const normalizeTime = (time) => {
//     if (time.includes(':')) {
//       const [hours, minutes] = time
//         .split(':')
//         .map((num) => num.padStart(2, '0'));
//       return `${hours}:${minutes}`;
//     } else if (time.length === 1) {
//       return `0${time}:00`;
//     } else if (time.length === 2) {
//       return `${time}:00`;
//     } else if (time.length === 3) {
//       return `${time.slice(0, 1)}${time.slice(1, 3)}:00`;
//     } else if (time.length === 4) {
//       return `${time.slice(0, 2)}:${time.slice(2)}`;
//     }
//     return '00:00'; // Default value if the format is not recognized
//   };

//   const [startHours, startMinutes] = normalizeTime(start)
//     .split(':')
//     .map(Number);
//   const [endHours, endMinutes] = normalizeTime(end).split(':').map(Number);

//   const startDate = new Date(1970, 0, 1, startHours, startMinutes);
//   const endDate = new Date(1970, 0, 1, endHours, endMinutes);

//   const diff = endDate - startDate; // Difference in milliseconds

//   let hours;
//   if (diff < 0) {
//     // Handle cases where end time is the next day
//     hours = (24 * 60 * 60 * 1000 + diff) / (60 * 60 * 1000);
//   } else {
//     hours = diff / (60 * 60 * 1000);
//   }

//   return parseFloat(hours.toFixed(2));
// };

export const calculateHoursWorked = (start, end) => {
  const normalizeTime = (time) => {
    if (time.includes(':')) {
      const [hours, minutes] = time
        .split(':')
        .map((num) => num.padStart(2, '0'));
      return `${hours}:${minutes}`;
    }
    if (time.length === 1) return `0${time}:00`;
    if (time.length === 2) return `${time}:00`;
    if (time.length === 3) return `${time.slice(0, 1)}${time.slice(1, 3)}:00`;
    if (time.length === 4) return `${time.slice(0, 2)}:${time.slice(2)}`;
    return '00:00'; // Default value if the format is not recognized
  };

  const [startHours, startMinutes] = normalizeTime(start)
    .split(':')
    .map(Number);
  const [endHours, endMinutes] = normalizeTime(end).split(':').map(Number);

  const startDate = new Date(1970, 0, 1, startHours, startMinutes);
  const endDate = new Date(1970, 0, 1, endHours, endMinutes);

  const diff = endDate - startDate; // Difference in milliseconds
  const msInHour = 60 * 60 * 1000; // Number of milliseconds in an hour

  let hours;
  if (diff < 0) {
    // Handle cases where end time is the next day
    hours = (24 * msInHour + diff) / msInHour;
  } else {
    hours = diff / msInHour;
  }

  return Math.round(hours * 100) / 100; // Round to two decimal places
};
