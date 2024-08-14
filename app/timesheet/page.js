// app/timesheet/page.js
import createTimesheet from '@/actions/actions';
import {
  getKindeServerSession,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import UserTimesheetData from '@/components/UserTimesheetData';

const TimesheetPage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login?post_login_redirect_url=/timesheet');
  }

  const user = await getUser();
  const username = user
    ? `${user.given_name || ''} ${user.family_name || ''}`.trim() || user.email
    : 'Unknown';

  return (
    <main className='flex flex-col md:flex-row justify-center items-start bg-white p-5 space-y-5 md:space-y-0'>
      {/* Form Section */}
      <div className='bg-white shadow-lg rounded-lg p-8 w-full md:w-1/2 lg:w-1/3'>
        <h1 className='text-xl font-semibold mb-6 text-gray-800 text-center'>
          Assign your work today
        </h1>

        <form action={createTimesheet} className='space-y-6'>
          <div className='flex flex-col'>
            <label className='text-sm font-medium text-gray-700' htmlFor='date'>
              Date
            </label>
            <input
              type='date'
              name='date'
              id='date'
              className='border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='start'
            >
              Start Time
            </label>
            <input
              type='time'
              name='start'
              id='start'
              className='border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-medium text-gray-700' htmlFor='end'>
              End Time
            </label>
            <input
              type='time'
              name='end'
              id='end'
              className='border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <input type='hidden' name='username' value={username} />

          <button
            type='submit'
            className='w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition duration-200'
          >
            Submit
          </button>
        </form>
      </div>

      {/* User Timesheet Data Section */}
      <div className='bg-white lg:ml-2 shadow-lg rounded-lg p-8 w-full md:w-1/2 lg:w-2/3'>
        <UserTimesheetData username={username} />
      </div>
      <div>
        <LogoutLink className='block w-full md:w-auto px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-700 transition duration-300'>
          Logout
        </LogoutLink>
      </div>
    </main>
  );
};

export default TimesheetPage;
