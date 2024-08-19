// utils/downloadUtils.js

//------------------mixed style----------------//
import connectMongo from '@/db/connectMongo';
import Timesheet from '@/models/Timesheet';
import { calculateHoursWorked } from './dateUtils';

export async function downloadSummaryTimesheet() {
  const response = await fetch('/api/generate-timesheet?type=summary');
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Timesheet_Summary.xlsx';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

//-------------------Date Wise-------------------------//
export async function downloadDetailedTimesheet() {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch detailed timesheet data from the database
    const timesheets = await Timesheet.find({}).sort({ date: 1 });

    // Transform the data into a format suitable for the Excel sheet
    const detailedTimesheetData = timesheets.map((entry) => ({
      Date: formatDate(entry.date), // Format date as DD-MM-YYYY
      Name: entry.username,
      Start: entry.start,
      End: entry.end,
      Hours: calculateHoursWorked(entry.start, entry.end), // Ensure this function is imported or defined
    }));

    return detailedTimesheetData;
  } catch (error) {
    console.error('Error fetching detailed timesheet data:', error);
    throw new Error('Failed to fetch detailed timesheet data');
  }
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Array of abbreviated month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get abbreviated month name
  const month = monthNames[monthIndex];

  // Get last two digits of the year
  const shortYear = String(year).slice(-2);

  return `${day} ${month} ${shortYear}`;
}

//-------------------User Wise-------------------------//
// export async function downloadDetailedTimesheet() {
//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Fetch detailed timesheet data from the database, sorted by username
//     const timesheets = await Timesheet.find({}).sort({ username: 1 }); // 1 for ascending, -1 for descending

//     // Transform the data into a format suitable for the Excel sheet
//     const detailedTimesheetData = timesheets.map((entry) => ({
//       Name: entry.username,
//       Date: formatDate(entry.date), // Format date as DD-MM-YYYY

//       Start: entry.start,
//       End: entry.end,
//       Hours: calculateHoursWorked(entry.start, entry.end), // Ensure this function is imported or defined
//     }));

//     return detailedTimesheetData;
//   } catch (error) {
//     console.error('Error fetching detailed timesheet data:', error);
//     throw new Error('Failed to fetch detailed timesheet data');
//   }
// }

// // Helper function to format the date as DD-MM-YYYY
// function formatDate(date) {
//   const day = String(date.getDate()).padStart(2, '0');
//   const monthIndex = date.getMonth();
//   const year = date.getFullYear();

//   // Array of abbreviated month names
//   const monthNames = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ];

//   // Get abbreviated month name
//   const month = monthNames[monthIndex];

//   // Get last two digits of the year
//   const shortYear = String(year).slice(-2);

//   return `${day} ${month} ${shortYear}`;
// }

//------------------------------------------------------//

// // Helper function to format the date as DD-MM-YYYY
// function formatDate(date) {
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// }
//------------------------------------------------------//
