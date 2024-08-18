// mainfolder/app/page.js
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';

const Home = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-r from-gray-50 to-gray-100 text-white'>
      <div className='text-center'>
        <h1 className='text-4xl md:text-6xl font-extrabold mb-6 text-gray-700'>
          Deer Park Timesheet App
        </h1>
        <p className='text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-700'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          corporis non aut quo numquam voluptatem mollitia magni iste minima.
        </p>
        <div className='space-y-4'>
          <LoginLink className='block w-full md:w-auto px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 transition duration-300'>
            Login
          </LoginLink>
          <RegisterLink className='block w-full md:w-auto px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 transition duration-300'>
            Register
          </RegisterLink>
          <LogoutLink className='block w-full md:w-auto px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 transition duration-300'>
            Logout
          </LogoutLink>
        </div>
      </div>
    </main>
  );
};

export default Home;
