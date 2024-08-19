//mainfolder/actions/adminActions.js
import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';

export async function fetchTimesheetData() {
  await connectMongo();

  // Fetch timesheets from the database
  const timesheets = await Timesheet.find({}).sort({ date: 1 });

  // Ensure data is mapped correctly
  return timesheets.map((ts) => ({
    username: ts.username,
    date: ts.date.toISOString().split('T')[0],
    start: ts.start,
    end: ts.end,
  }));
}
