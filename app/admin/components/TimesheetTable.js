//mainfolder/app/admin/components/TimesheetTable.js

const TimesheetTable = ({ timesheets }) => {
  return (
    <div>
      {timesheets.map((timesheet) => (
        <div key={timesheet._id}>
          <p>{timesheet.username}</p>
          <p>{timesheet.date.toDateString()}</p>
          <p>
            {timesheet.start} - {timesheet.end}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TimesheetTable;
