// mainfolder/app/admin/page.js

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import {
  calculateHoursWorked,
  getLastFourWeeks,
  formatDate,
  getStartOfWeek,
} from '@/utils/dateUtils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login?post_login_redirect_url=/admin');
  }

  const user = await getUser();
  const username = user
    ? `${user.given_name || ''} ${user.family_name || ''}`.trim() || user.email
    : 'Unknown';

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
      <div className='flex justify-end'>
        <Link
          href='/api/generate-timesheet'
          className='px-4 py-2 bg-slate-700 hover:bg-slate-900 text-white rounded '
        >
          Export to Excel
        </Link>
      </div>
      <h1 className='text-lg font-semibold mb-2 text-lime-800 hover:text-emerald-950 '>
        Admin Area
      </h1>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-32 text-lime-800 hover:text-emerald-950'>
                Name
              </th>
              {dateRanges.map((range, index) => (
                <th
                  key={index}
                  className='border border-gray-300 px-2 py-1 text-center text-xs w-24 text-lime-800 hover:text-emerald-950'
                >
                  {`${formatDate(new Date(range.start))} - ${formatDate(
                    new Date(range.end)
                  )}`}
                </th>
              ))}
              <th className='border border-gray-300 px-2 py-1 text-center text-xs w-24 text-lime-800 hover:text-emerald-950'>
                Total (4 Weeks)
              </th>
              <th className='border border-gray-300 px-2 py-1 text-center text-xs w-24 text-lime-800 hover:text-emerald-950'>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(usersTimesheets).map((user) => (
              <tr key={user.username} className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2 text-left text-sm text-slate-700 hover:text-emerald-900 font-bold'>
                  {user.username || 'Unknown'}
                </td>
                {dateRanges.map((range, index) => {
                  const periodKey = `${formatDate(
                    new Date(range.start)
                  )} - ${formatDate(new Date(range.end))}`;
                  return (
                    <td
                      key={index}
                      className='border border-gray-300 px-2 py-1 text-center text-xs font-semibold text-slate-700 hover:text-emerald-900'
                    >
                      {(user.periods[periodKey] || 0).toFixed(2)} hrs
                    </td>
                  );
                })}
                <td className='border border-gray-300 px-2 py-1 text-center text-sm font-bold text-slate-700 hover:text-emerald-900'>
                  {user.totalHours.toFixed(2)} hrs
                </td>
                <td className='border border-gray-300 px-2 py-1 text-center text-sm '>
                  <Link
                    href={`/admin/${encodeURIComponent(user.username)}`}
                    className='text-emerald-700 hover:text-green-500 font-bold'
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
