// app/admin/[username]/page.js

import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import { calculateHoursWorked } from '@/utils/dateUtils';
import Link from 'next/link';

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
      <div className='flex justify-end'>
        <Link
          href='../admin'
          className='px-4 py-2 bg-slate-700 hover:bg-slate-900 text-white rounded '
        >
          Go Back
        </Link>
      </div>
      <h1 className='text-xl font-bold mb-5 text-lime-800 hover:text-emerald-950 '>{`${username}'s work.`}</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-1/4 text-lime-800 hover:text-emerald-950'>
                Date
              </th>
              <th className='border border-gray-300 px-4 py-1 text-left text-sm font-semibold w-1/4 text-lime-800 hover:text-emerald-950'>
                Start
              </th>
              <th className='border border-gray-300 px-4 py-1 text-left text-sm font-semibold w-1/4 text-lime-800 hover:text-emerald-950'>
                End
              </th>
              <th className='border border-gray-300 px-4 py-1 text-left text-sm font-semibold w-1/4 text-lime-800 hover:text-emerald-950'>
                Hours Worked
              </th>
              <th className='border border-gray-300 px-4 py-1 text-left text-sm font-semibold w-1/4 text-lime-800 hover:text-emerald-950'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {lastFourWeeksTimesheets.map((timesheet) => (
              <tr key={timesheet._id.toString()} className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 font-bold'>
                  {formatDate(timesheet.date)}
                </td>
                <td className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 font-bold'>
                  {timesheet.start}
                </td>
                <td className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 font-bold'>
                  {timesheet.end}
                </td>
                <td className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 font-bold'>
                  {calculateHoursWorked(timesheet.start, timesheet.end)} hrs
                </td>

                <td className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 flex'>
                  <EditButton id={timesheet._id.toString()} />
                  <DeleteButton id={timesheet._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 font-bold'
                colSpan='3'
              >
                Total Hours (Last 4 Weeks)
              </td>
              <td className='border border-gray-300 px-4 py-1 text-left text-sm text-lime-800 hover:text-emerald-950 font-bold'>
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
