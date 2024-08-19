// app / api / generate - timesheet / route.js;
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { fetchAndAggregateData } from '@/utils/timesheetUtils';
import { downloadDetailedTimesheet } from '@/utils/downloadUtils';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    let data;

    // Determine whether to fetch detailed or summary data
    if (type === 'detailed') {
      data = await downloadDetailedTimesheet(); // Fetch detailed timesheet data
    } else if (type === 'summary') {
      data = await fetchAndAggregateData(); // Fetch summary data
    } else {
      return new NextResponse('Invalid type', { status: 400 });
    }

    // Create the Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheet');

    // Write the workbook to a buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set response headers for file download
    const headers = new Headers();
    headers.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    headers.set(
      'Content-Disposition',
      `attachment; filename="Timesheet_${
        type === 'detailed' ? 'Detailed' : 'Summary'
      }.xlsx"`
    );

    // Return the Excel file as a response
    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
