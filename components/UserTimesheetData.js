// //  mainfolder/components/UserTimesheetData

// import connectMongo from '@/db/connectMongo';
// import Timesheet from '@/models/Timesheet';
// import { calculateHoursWorked } from '@/utils/dateUtils';

// const UserTimesheetData = async ({ username }) => {
//   await connectMongo();

//   const today = new Date();
//   const startOfWeek = new Date(today);
//   // Set start of the week to Monday
//   startOfWeek.setDate(today.getDate() - (today.getDay() || 7) + 1);
//   startOfWeek.setHours(0, 0, 0, 0);

//   const endOfWeek = new Date(startOfWeek);
//   // Set end of the week to Sunday
//   endOfWeek.setDate(startOfWeek.getDate() + 6);
//   endOfWeek.setHours(23, 59, 59, 999);

//   const timesheets = await Timesheet.find({
//     username,
//     date: {
//       $gte: startOfWeek,
//       $lte: endOfWeek,
//     },
//   }).sort({ date: -1 });

//   const totalHours = timesheets.reduce((sum, ts) => {
//     return sum + calculateHoursWorked(ts.start, ts.end);
//   }, 0);

//   return (
//     <div className='p-5'>
//       <h2 className='text-xl font-semibold mb-4'>{username}s Timesheets</h2>
//       <div className='overflow-x-auto'>
//         <table className='min-w-full bg-white border'>
//           <thead>
//             <tr>
//               <th className='border px-4 py-2'>Date</th>
//               <th className='border px-4 py-2'>Start</th>
//               <th className='border px-4 py-2'>End</th>
//               <th className='border px-4 py-2'>Hours Worked</th>
//             </tr>
//           </thead>
//           <tbody>
//             {timesheets.map((ts) => (
//               <tr key={ts._id}>
//                 <td className='border px-4 py-2'>
//                   {ts.date.toLocaleDateString()}
//                 </td>
//                 <td className='border px-4 py-2'>{ts.start}</td>
//                 <td className='border px-4 py-2'>{ts.end}</td>
//                 <td className='border px-4 py-2'>
//                   {calculateHoursWorked(ts.start, ts.end)} hrs
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan='3' className='border px-4 py-2 font-bold'>
//                 Total Hours
//               </td>
//               <td className='border px-4 py-2 font-bold'>{totalHours} hrs</td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserTimesheetData;

// import connectMongo from '@/db/connectMongo';
// import Timesheet from '@/models/Timesheet';
// import { calculateHoursWorked } from '@/utils/dateUtils';

// const UserTimesheetData = async ({ username }) => {
//   await connectMongo();

//   const today = new Date();
//   const startOfWeek = new Date(today);
//   // Set start of the week to Monday
//   startOfWeek.setDate(today.getDate() - (today.getDay() || 7) + 1);
//   startOfWeek.setHours(0, 0, 0, 0);

//   const endOfWeek = new Date(startOfWeek);
//   // Set end of the week to Sunday
//   endOfWeek.setDate(startOfWeek.getDate() + 6);
//   endOfWeek.setHours(23, 59, 59, 999);

//   const timesheets = await Timesheet.find({
//     username,
//     date: {
//       $gte: startOfWeek,
//       $lte: endOfWeek,
//     },
//   }).sort({ date: -1 });

//   const totalHours = timesheets.reduce((sum, ts) => {
//     return sum + calculateHoursWorked(ts.start, ts.end);
//   }, 0);

//   return (
//     <div className='p-5'>
//       <h2 className='text-xl font-semibold mb-4'>{username}s Timesheets</h2>
//       <div className='overflow-x-auto'>
//         <table className='min-w-full bg-white border'>
//           <thead>
//             <tr>
//               <th className='border px-4 py-2'>Date</th>
//               <th className='border px-4 py-2'>Start</th>
//               <th className='border px-4 py-2'>End</th>
//               <th className='border px-4 py-2'>Hours Worked</th>
//             </tr>
//           </thead>
//           <tbody>
//             {timesheets.map((ts) => (
//               <tr key={ts._id}>
//                 <td className='border px-4 py-2'>
//                   {ts.date.toLocaleDateString()}
//                 </td>
//                 <td className='border px-4 py-2'>{ts.start}</td>
//                 <td className='border px-4 py-2'>{ts.end}</td>
//                 <td className='border px-4 py-2'>
//                   {calculateHoursWorked(ts.start, ts.end).toFixed(2)} hrs
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan='3' className='border px-4 py-2 font-bold'>
//                 Total Hours
//               </td>
//               <td className='border px-4 py-2 font-bold'>
//                 {totalHours.toFixed(2)} hrs
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserTimesheetData;

import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import { calculateHoursWorked } from '@/utils/dateUtils';

const UserTimesheetData = async ({ username }) => {
  try {
    await connectMongo();

    const today = new Date();
    const startOfWeek = new Date(today);
    // Set start of the week to Monday
    startOfWeek.setDate(today.getDate() - (today.getDay() || 7) + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    // Set end of the week to Sunday
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const timesheets = await Timesheet.find({
      username,
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    }).sort({ date: -1 });

    const totalHours = timesheets.reduce((sum, ts) => {
      return sum + calculateHoursWorked(ts.start, ts.end);
    }, 0);

    return (
      <div className='p-5'>
        <h2 className='text-xl font-semibold mb-4'>{username}s Timesheets</h2>
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
              {timesheets.map((ts) => (
                <tr key={ts._id}>
                  <td className='border px-4 py-2'>
                    {new Date(ts.date).toLocaleDateString()}
                  </td>
                  <td className='border px-4 py-2'>{ts.start}</td>
                  <td className='border px-4 py-2'>{ts.end}</td>
                  <td className='border px-4 py-2'>
                    {calculateHoursWorked(ts.start, ts.end).toFixed(2)} hrs
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='3' className='border px-4 py-2 font-bold'>
                  Total Hours
                </td>
                <td className='border px-4 py-2 font-bold'>
                  {totalHours.toFixed(2)} hrs
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch timesheets:', error);
    return <div>Error loading timesheets. Please try again later.</div>;
  }
};

export default UserTimesheetData;
