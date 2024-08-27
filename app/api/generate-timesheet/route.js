// // // app/api/generate-timesheet/route.js

import { NextResponse } from 'next/server';
import { exportToExcel } from '@/utils/exportsToExcel';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'detail';

  try {
    const filePath = await exportToExcel(type);
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
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
