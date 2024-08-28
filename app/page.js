// // mainfolder/app/page.js

// const Home = () => {
//   return (
//     <main className='flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-gray-50 to-gray-100 text-white'>
//       <div className='text-center'>
//         <h1 className='text-4xl md:text-6xl font-extrabold  text-gray-700'>
//           Deer Park Timesheet App
//         </h1>
//         <p className='text-lg md:text-xl max-w-2xl mx-auto text-gray-700'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
//           corporis non aut quo numquam voluptatem mollitia magni iste minima.
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Home;

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
