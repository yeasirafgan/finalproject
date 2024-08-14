// // mainfolder/app/admin/page.js

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import {
  calculateHoursWorked,
  getLastFourWeeksDateRanges,
  formatDate,
} from '@/utils/dateUtils';
import Link from 'next/link';

const AdminPage = async () => {
  await connectMongo();

  const timesheets = await Timesheet.find({}).sort({ date: 1 });

  // Calculate the current 4-week period
  const currentDate = new Date();
  let dateRanges = getLastFourWeeksDateRanges(currentDate);

  // The date ranges are already ordered to show the latest week first
  // so we don't need to reverse them here.

  // Calculate 4-week period totals
  const usersTimesheets = timesheets.reduce((acc, timesheet) => {
    const { username, date, start, end } = timesheet;

    if (!username) {
      console.error('Missing username in timesheet:', timesheet);
      return acc;
    }

    const weekStartDate = new Date(date);
    weekStartDate.setDate(
      weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7)
    );

    const hoursWorked = calculateHoursWorked(start, end);

    // Initialize user data if not present
    if (!acc[username]) {
      acc[username] = { username, periods: {} };
    }

    const period = dateRanges.find(
      (range) => weekStartDate >= range.start && weekStartDate <= range.end
    );

    if (period) {
      const periodKey = `${formatDate(period.start)} - ${formatDate(
        period.end
      )}`;

      if (!acc[username].periods[periodKey]) {
        acc[username].periods[periodKey] = 0;
      }
      acc[username].periods[periodKey] += hoursWorked;
    } else {
      console.warn('No matching period found for date:', weekStartDate);
    }

    return acc;
  }, {});

  // Debugging: log the processed data
  console.log('Processed Users Timesheets:', usersTimesheets);

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
                  {`${formatDate(range.start)} - ${formatDate(range.end)}`}
                </th>
              ))}
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
                  const periodKey = `${formatDate(range.start)} - ${formatDate(
                    range.end
                  )}`;
                  return (
                    <td
                      key={index}
                      className='border border-gray-300 px-2 py-1 text-center text-xs'
                    >
                      {user.periods[periodKey] || 0} hrs
                    </td>
                  );
                })}
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
