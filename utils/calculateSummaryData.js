// mainfolder/utils/calculateSummaryData.js

export function calculateSummaryData(data) {
  return data.map((user) => {
    const weeklyCount = user.timeEntries.length;
    const weeklyTotalHours = user.timeEntries.reduce(
      (total, entry) => total + entry.hoursWorked,
      0
    );
    const fourWeeklyTotalHours = user.timeEntries
      .slice(-4)
      .reduce((total, entry) => total + entry.hoursWorked, 0);

    return {
      username: user.username,
      weeklyCount,
      weeklyTotalHours,
      fourWeeklyTotalHours,
    };
  });
}
