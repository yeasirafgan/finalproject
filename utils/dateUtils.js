export function calculateHoursWorked(start, end) {
  const startDate = new Date(`1970-01-01T${start}:00Z`);
  let endDate = new Date(`1970-01-01T${end}:00Z`);

  // If end time is before start time, assume it is on the next day
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const differenceInMilliseconds = endDate - startDate;
  const hours = differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

  // Round to two decimal places
  return parseFloat(hours.toFixed(2));
}

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

export function getLastFourWeeks() {
  const weeks = [];
  const today = new Date();
  const todayStartOfWeek = getStartOfWeek(today);

  for (let i = 0; i < 4; i++) {
    const startOfWeek = new Date(todayStartOfWeek);
    startOfWeek.setDate(todayStartOfWeek.getDate() - i * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    weeks.push({
      start: startOfWeek.toISOString().split('T')[0], // Format as YYYY-MM-DD
      end: endOfWeek.toISOString().split('T')[0], // Format as YYYY-MM-DD
    });
  }

  // weeks.sort((a, b) => new Date(a.start) - new Date(b.start));

  return weeks;
}

export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
  const month = date.toLocaleString('default', { month: 'short' }); // Get short month name

  return `${day} ${month}`;
}

export function getStartOfWeek(date) {
  const current = new Date(date);
  const day = current.getUTCDay();
  const difference = current.getUTCDate() - day + (day === 0 ? -6 : 1);
  current.setUTCDate(difference);
  current.setUTCHours(0, 0, 0, 0); // Normalizing time to midnight for consistency
  return current;
}
