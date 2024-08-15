// //mainfolder/app/admin/[username]/page.js

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import { calculateHoursWorked } from '@/utils/dateUtils';

const UserDetailPage = async ({ params }) => {
  const username = decodeURIComponent(params.username);

  // Connect to MongoDB
  await connectMongo();

  // Fetch timesheets sorted by date descending (latest first)
  const timesheets = await Timesheet.find({ username }).sort({ date: -1 });

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
    const year = date.getFullYear();
    const weekday = date.toLocaleString('default', { weekday: 'long' }); // Get full weekday name

    return `${day} ${month} ${year} ${weekday}`;
  };

  // Calculate total hours worked for the last four weeks
  const today = new Date();
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(today.getDate() - 28); // 4 weeks back

  const lastFourWeeksTimesheets = timesheets.filter(
    (timesheet) => new Date(timesheet.date) >= fourWeeksAgo
  );

  const totalHours = lastFourWeeksTimesheets.reduce(
    (acc, timesheet) =>
      acc + calculateHoursWorked(timesheet.start, timesheet.end),
    0
  );

  return (
    <main className='p-10'>
      <h1 className='text-xl font-bold mb-5'>{`${username}'s work.`}</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Date</th>
              <th className='border px-4 py-2'>Start</th>
              <th className='border px-4 py-2'>End</th>
              <th className='border px-4 py-2'>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {lastFourWeeksTimesheets.map((timesheet) => (
              <tr key={timesheet._id}>
                <td className='border px-4 py-2'>
                  {formatDate(timesheet.date)}
                </td>
                <td className='border px-4 py-2'>{timesheet.start}</td>
                <td className='border px-4 py-2'>{timesheet.end}</td>
                <td className='border px-4 py-2'>
                  {calculateHoursWorked(timesheet.start, timesheet.end)} hrs
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='border px-4 py-2 font-bold' colSpan='3'>
                Total Hours (Last 4 Weeks)
              </td>
              <td className='border px-4 py-2 font-bold'>
                {totalHours.toFixed(2)} hrs
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};

export default UserDetailPage;
