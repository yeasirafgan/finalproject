// // app/timesheet/page.js
import createTimesheet from '@/actions/actions';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import UserTimesheetData from '@/components/UserTimesheetData';
import { redirect } from 'next/navigation';

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
        <h1 className=' text-md font-bold mb-6 text-emerald-900'>
          How many hours you work today
        </h1>

        <form action={createTimesheet} className='space-y-6'>
          <div className='flex flex-col'>
            <label
              className='text-sm font-medium text-emerald-900'
              htmlFor='date'
            >
              Date
            </label>
            <input
              type='date'
              name='date'
              id='date'
              className='border text-emerald-900 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-900'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='text-sm font-medium text-emerald-900'
              htmlFor='start'
            >
              Start Time
            </label>
            <input
              type='time'
              name='start'
              id='start'
              className='border text-emerald-900 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-900'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='text-sm font-medium text-emerald-900'
              htmlFor='end'
            >
              End Time
            </label>
            <input
              type='time'
              name='end'
              id='end'
              className='border text-emerald-900 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-900'
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
    </main>
  );
};

export default TimesheetPage;
