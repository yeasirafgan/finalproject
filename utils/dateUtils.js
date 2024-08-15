// // mainfolder/utils/dateUtils.js

// export function calculateHoursWorked(start, end) {
//   const startDate = new Date(`1970-01-01T${start}`);
//   let endDate = new Date(`1970-01-01T${end}`);

//   // If end time is before start time, assume it is on the next day
//   if (endDate < startDate) {
//     endDate.setDate(endDate.getDate() + 1);
//   }

//   const differenceInMilliseconds = endDate - startDate;
//   return differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
// }

// export function getWeeklyPeriod(date) {
//   const startOfWeek = new Date(date);
//   const day = startOfWeek.getDay();
//   const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
//   startOfWeek.setDate(diff);

//   const endOfWeek = new Date(startOfWeek);
//   endOfWeek.setDate(startOfWeek.getDate() + 6);

//   return {
//     startDate: startOfWeek,
//     endDate: endOfWeek,
//   };
// }

// export function getLastFourWeeks() {
//   const weeks = [];
//   const today = new Date();

//   for (let i = 0; i < 4; i++) {
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(
//       today.getDate() - today.getDay() - i * 7 + (today.getDay() === 0 ? -6 : 1)
//     ); // Adjust for Sunday

//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(startOfWeek.getDate() + 6);

//     weeks.push({ start: startOfWeek, end: endOfWeek });
//   }

//   return weeks;
// }

// export function formatDate(date) {
//   const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
//   const month = date.toLocaleString('default', { month: 'short' }); // Get short month name

//   return `${day} ${month}`;
// }

export function calculateHoursWorked(start, end) {
  const startDate = new Date(`1970-01-01T${start}`);
  let endDate = new Date(`1970-01-01T${end}`);

  // If end time is before start time, assume it is on the next day
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const differenceInMilliseconds = endDate - startDate;
  const hours = differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

  // Round to two decimal places
  return Math.round(hours * 100) / 100;
}

export function getWeeklyPeriod(date) {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    startDate: startOfWeek,
    endDate: endOfWeek,
  };
}

export function getLastFourWeeks() {
  const weeks = [];
  const today = new Date();

  for (let i = 0; i < 4; i++) {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() - i * 7 + (today.getDay() === 0 ? -6 : 1)
    ); // Adjust for Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    weeks.push({ start: startOfWeek, end: endOfWeek });
  }

  return weeks;
}

export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
  const month = date.toLocaleString('default', { month: 'short' }); // Get short month name

  return `${day} ${month}`;
}
