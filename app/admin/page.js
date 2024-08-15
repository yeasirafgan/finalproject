// // // // mainfolder/app/admin/page.js

// import connectMongo from '@/db/connectMongo';
// import Timesheet from '@/models/Timesheet';
// import {
//   calculateHoursWorked,
//   getLastFourWeeks,
//   formatDate,
// } from '@/utils/dateUtils';
// import Link from 'next/link';

// const AdminPage = async () => {
//   await connectMongo();

//   const timesheets = await Timesheet.find({}).sort({ date: 1 });
//   const dateRanges = getLastFourWeeks();

//   const usersTimesheets = timesheets.reduce((acc, timesheet) => {
//     const { username, date, start, end } = timesheet;
//     const weekStartDate = new Date(date);
//     weekStartDate.setDate(
//       weekStartDate.getDate() -
//         (weekStartDate.getDay() === 0 ? 6 : weekStartDate.getDay() - 1)
//     );

//     const hoursWorked = calculateHoursWorked(start, end);

//     if (!acc[username]) {
//       acc[username] = { username, periods: {}, totalHours: 0 };
//     }

//     // Integration of the period calculation
//     const period = dateRanges.find(
//       (range) => weekStartDate >= range.start && weekStartDate <= range.end
//     );

//     if (period) {
//       const periodKey = `${formatDate(period.start)} - ${formatDate(
//         period.end
//       )}`;
//       acc[username].periods[periodKey] =
//         (acc[username].periods[periodKey] || 0) + hoursWorked;
//       acc[username].totalHours += hoursWorked;
//     }

//     return acc;
//   }, {});

//   return (
//     <main className='p-5 sm:p-10'>
//       <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Admin Area</h1>
//       <div className='overflow-x-auto'>
//         <table className='min-w-full bg-white border border-gray-200'>
//           <thead className='bg-gray-100'>
//             <tr>
//               <th className='border border-gray-300 px-4 py-2 text-left text-sm font-semibold w-32'>
//                 Name
//               </th>
//               {dateRanges.map((range, index) => (
//                 <th
//                   key={index}
//                   className='border border-gray-300 px-2 py-1 text-center text-xs w-24'
//                 >
//                   {`${formatDate(range.start)} - ${formatDate(range.end)}`}
//                 </th>
//               ))}
//               <th className='border border-gray-300 px-2 py-1 text-center text-xs w-24'>
//                 Total (4 Weeks)
//               </th>
//               <th className='border border-gray-300 px-2 py-1 text-center text-xs w-24'>
//                 Details
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(usersTimesheets).map((user) => (
//               <tr key={user.username} className='hover:bg-gray-50'>
//                 <td className='border border-gray-300 px-4 py-2 text-left text-sm'>
//                   {user.username || 'Unknown'}
//                 </td>
//                 {dateRanges.map((range, index) => {
//                   const periodKey = `${formatDate(range.start)} - ${formatDate(
//                     range.end
//                   )}`;
//                   return (
//                     <td
//                       key={index}
//                       className='border border-gray-300 px-2 py-1 text-center text-xs'
//                     >
//                       {user.periods[periodKey] || 0} hrs
//                     </td>
//                   );
//                 })}
//                 <td className='border border-gray-300 px-2 py-1 text-center text-xs'>
//                   {user.totalHours.toFixed(2)} hrs
//                 </td>
//                 <td className='border border-gray-300 px-2 py-1 text-center text-xs'>
//                   <Link
//                     href={`/admin/${encodeURIComponent(user.username)}`}
//                     className='text-blue-500 hover:underline'
//                   >
//                     View Details
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// };

// export default AdminPage;

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import {
  calculateHoursWorked,
  getLastFourWeeks,
  formatDate,
} from '@/utils/dateUtils';
import Link from 'next/link';

const AdminPage = async () => {
  await connectMongo();

  const timesheets = await Timesheet.find({}).sort({ date: 1 });
  const dateRanges = getLastFourWeeks();

  const usersTimesheets = timesheets.reduce((acc, timesheet) => {
    const { username, date, start, end } = timesheet;
    const weekStartDate = new Date(date);
    weekStartDate.setDate(
      weekStartDate.getDate() -
        (weekStartDate.getDay() === 0 ? 6 : weekStartDate.getDay() - 1)
    );

    const hoursWorked = calculateHoursWorked(start, end);

    if (!acc[username]) {
      acc[username] = { username, periods: {}, totalHours: 0 };
    }

    // Integration of the period calculation
    const period = dateRanges.find(
      (range) => weekStartDate >= range.start && weekStartDate <= range.end
    );

    if (period) {
      const periodKey = `${formatDate(period.start)} - ${formatDate(
        period.end
      )}`;
      acc[username].periods[periodKey] =
        (acc[username].periods[periodKey] || 0) + hoursWorked;
      acc[username].totalHours += hoursWorked;
    }

    return acc;
  }, {});

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
                  const periodKey = `${formatDate(range.start)} - ${formatDate(
                    range.end
                  )}`;
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
