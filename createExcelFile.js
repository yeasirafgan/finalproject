//mainfolder/create/excelFile.js

import * as XLSX from 'xlsx';
import { fetchAndAggregateData } from './utils/timesheetUtils';

async function createExcelFile() {
  try {
    // Fetch and aggregate data
    const data = await fetchAndAggregateData();

    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheet Summary');

    // Write workbook to file
    XLSX.writeFile(workbook, 'Timesheet_Summary.xlsx');

    console.log('Excel file has been created successfully.');
  } catch (error) {
    console.error('Error creating Excel file:', error);
  }
}

createExcelFile();
