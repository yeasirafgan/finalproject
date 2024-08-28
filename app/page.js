// // mainfolder/app/page.js

export const metadata = {
  title: 'Deerpark timesheet',
  description: 'Simple timesheet app for Deerpark staffs...',
};

const Home = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-[82vh] w-full px-4 bg-gradient-to-r from-gray-50 to-gray-100'>
      <div className='text-center max-w-2xl'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-700 mb-4'>
          Deer Park Timesheet App
        </h1>
        <p className='text-lg md:text-xl text-slate-700 font-semibold'>
          Please submit your daily worktime...
        </p>
      </div>
    </main>
  );
};

export default Home;
