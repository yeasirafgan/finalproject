// // // // mainfolder/app/admin/page.js

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import {
  calculateHoursWorked,
  getLastFourWeeks,
  formatDate,
  getStartOfWeek,
} from '@/utils/dateUtils';
import Link from 'next/link';

const AdminPage = async () => {
  await connectMongo();

  const timesheets = await Timesheet.find({}).sort({ date: 1 });
  const dateRanges = getLastFourWeeks();
  console.log('Date Ranges:', dateRanges);

  const usersTimesheets = timesheets.reduce((acc, timesheet) => {
    const { username, date, start, end } = timesheet;
    const weekStartDate = getStartOfWeek(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const hoursWorked = calculateHoursWorked(start, end);
    console.log('Hours worked:', hoursWorked);

    if (!acc[username]) {
      acc[username] = { username, periods: {}, totalHours: 0 };
    }

    // Find the matching period
    const period = dateRanges.find((range) => {
      const rangeStart = new Date(range.start);
      const rangeEnd = new Date(range.end);
      const weekStart = new Date(weekStartDate);

      // Check if the weekStartDate falls within the period
      console.log('Checking period:', {
        startDate: range.start,
        endDate: range.end,
        weekStartDate,
        rangeStart,
        rangeEnd,
        weekStart,
        inRange: weekStart >= rangeStart && weekStart <= rangeEnd,
      });

      return weekStart >= rangeStart && weekStart <= rangeEnd;
    });

    // Log period details
    if (period) {
      console.log('Matched period:', period);
      const periodKey = `${formatDate(new Date(period.start))} - ${formatDate(
        new Date(period.end)
      )}`;
      acc[username].periods[periodKey] =
        (acc[username].periods[periodKey] || 0) + hoursWorked;
      acc[username].totalHours += hoursWorked;
    } else {
      console.log('No matching period for week start date:', weekStartDate);
    }

    return acc;
  }, {});

  console.log('Users timesheets:', JSON.stringify(usersTimesheets, null, 2));

  return (
    <main className='p-5 sm:p-10'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Admin Area</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-32'>
                Name
              </th>
              {dateRanges.map((range, index) => (
                <th
                  key={index}
                  className='border border-gray-300 px-2 py-1 text-center text-xs w-24'
                >
                  {`${formatDate(new Date(range.start))} - ${formatDate(
                    new Date(range.end)
                  )}`}
                </th>
              ))}
              <th className='border border-gray-300 px-2 py-1 text-center text-xs w-24'>
                Total (4 Weeks)
              </th>
              <th className='border border-gray-300 px-2 py-1 text-center text-xs w-24'>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(usersTimesheets).map((user) => (
              <tr key={user.username} className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2 text-left text-sm'>
                  {user.username || 'Unknown'}
                </td>
                {dateRanges.map((range, index) => {
                  const periodKey = `${formatDate(
                    new Date(range.start)
                  )} - ${formatDate(new Date(range.end))}`;
                  return (
                    <td
                      key={index}
                      className='border border-gray-300 px-2 py-1 text-center text-xs'
                    >
                      {(user.periods[periodKey] || 0).toFixed(2)} hrs
                    </td>
                  );
                })}
                <td className='border border-gray-300 px-2 py-1 text-center text-xs'>
                  {user.totalHours.toFixed(2)} hrs
                </td>
                <td className='border border-gray-300 px-2 py-1 text-center text-xs'>
                  <Link
                    href={`/admin/${encodeURIComponent(user.username)}`}
                    className='text-blue-500 hover:underline'
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminPage;
