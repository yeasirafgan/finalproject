//  mainfolder/components/UserTimesheetData

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import { calculateHoursWorked } from '@/utils/dateUtils'; // Import the function

const UserTimesheetData = async ({ username }) => {
  await connectMongo();

  // Get the start and end of the current week
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Fetch timesheets for the current week
  const timesheets = await Timesheet.find({
    username,
    date: {
      $gte: startOfWeek,
      $lte: endOfWeek,
    },
  }).sort({ date: -1 });

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <h2 className='text-xl text-center md:text-left font-semibold mb-4 text-gray-800'>
        You work this Week
      </h2>
      {timesheets.length > 0 ? (
        <table className='w-full border-separate border-spacing-0'>
          <thead>
            <tr>
              <th className='border-b px-4 py-2 text-left text-gray-600'>
                Date
              </th>
              <th className='border-b px-4 py-2 text-left text-gray-600'>
                Start
              </th>
              <th className='border-b px-4 py-2 text-left text-gray-600'>
                End
              </th>
              <th className='border-b px-4 py-2 text-left text-gray-600'>
                Hours Worked
              </th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((timesheet) => (
              <tr key={timesheet._id} className='hover:bg-gray-50'>
                <td className='border-b px-4 py-1'>
                  {formatDate(timesheet.date)}
                </td>
                <td className='border-b px-4 py-1 '>{timesheet.start}</td>
                <td className='border-b px-4 py-1'>{timesheet.end}</td>
                <td className='border-b px-4 py-1'>
                  {calculateHoursWorked(timesheet.start, timesheet.end)} hrs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-gray-600'>No timesheets submitted for this week.</p>
      )}
    </div>
  );
};

export default UserTimesheetData;
