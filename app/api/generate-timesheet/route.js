//app/api/generate-timesheet/route.js

import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { fetchAndAggregateData } from '@/utils/timesheetUtils';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const data = await fetchAndAggregateData();

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheet Summary');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const headers = new Headers();
    headers.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    headers.set(
      'Content-Disposition',
      'attachment; filename="Timesheet_Summary.xlsx"'
    );

    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
