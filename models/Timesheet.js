// mainfolder/models/Timesheet.js

import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true }, // Ensure this field is defined
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const Timesheet =
  mongoose.models.Timesheet || mongoose.model('Timesheet', timesheetSchema);

export default Timesheet;
