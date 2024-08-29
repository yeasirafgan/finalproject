// // app/api/generate-timesheet/route.js

// import { NextResponse } from 'next/server';
// import { exportToExcel } from '@/utils/exportsToExcel';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const type = searchParams.get('type') || 'detail';

//   try {
//     const buffer = await exportToExcel(type);

//     return new NextResponse(buffer, {
//       headers: {
//         'Content-Type':
//           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         'Content-Disposition': `attachment; filename=timesheet_${type}.xlsx`,
//       },
//     });
//   } catch (error) {
//     console.error('Error generating Excel file:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { generateExcelFile } from '@/utils/createExcelFile';
import { calculateSummaryData } from '@/utils/calculateSummaryData'; // Import the new function

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'detail';

  try {
    let data;

    // Fetch your raw data here
    // For example, const rawData = await fetchDataFromDatabase();

    if (type === 'summary') {
      // Calculate summary data if type is 'summary'
      data = calculateSummaryData(rawData);
    } else {
      // Use rawData directly for detailed report
      data = rawData;
    }

    const buffer = await generateExcelFile(data, type);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=timesheet_${type}.xlsx`,
      },
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
