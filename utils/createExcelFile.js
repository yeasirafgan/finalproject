// // // mainfolder/utils/createExcelFile.js

import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

// Utility function to ensure the temporary directory exists
function ensureTempDir() {
  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  return tempDir;
}

export async function generateExcelFile(data, type) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Timesheet');

  if (type === 'summary') {
    worksheet.columns = [
      { header: 'Name', key: 'username' },
      ...Object.keys(data[0])
        .filter((key) => key !== 'username' && key !== 'totalHours')
        .map((key) => ({ header: key, key: key })),
      { header: 'Total Hours', key: 'totalHours' },
    ];

    data.forEach((entry) => worksheet.addRow(entry));
  } else {
    worksheet.columns = [
      { header: 'Username', key: 'username' },
      { header: 'Date', key: 'date' },
      { header: 'Start Time', key: 'start' },
      { header: 'End Time', key: 'end' },
      { header: 'Hours Worked', key: 'hoursWorked' },
    ];

    let currentUsername = '';
    let userTotalHours = 0;

    data.forEach((entry) => {
      if (entry.username !== currentUsername && currentUsername) {
        worksheet.addRow({
          username: `Total for ${currentUsername}`,
          date: '',
          start: '',
          end: '',
          hoursWorked: userTotalHours.toFixed(2),
        });
        userTotalHours = 0;
      }

      worksheet.addRow(entry);
      currentUsername = entry.username;
      userTotalHours += entry.hoursWorked;
    });

    if (currentUsername) {
      worksheet.addRow({
        username: `Total for ${currentUsername}`,
        date: '',
        start: '',
        end: '',
        hoursWorked: userTotalHours.toFixed(2),
      });
    }

    const grandTotal = data.reduce((sum, entry) => sum + entry.hoursWorked, 0);
    worksheet.addRow({
      username: 'Grand Total',
      date: '',
      start: '',
      end: '',
      hoursWorked: grandTotal.toFixed(2),
    });
  }

  worksheet.columns.forEach((column) => {
    column.width =
      Math.max(
        column.header.length,
        ...data.map((d) => String(d[column.key] || '').length)
      ) + 2;
  });

  const tempDir = ensureTempDir();
  const filePath = path.join(tempDir, `timesheet_${type}.xlsx`);

  await workbook.xlsx.writeFile(filePath);
  return filePath;
}
