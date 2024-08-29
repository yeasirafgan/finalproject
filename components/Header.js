// // // // // mainfolder/components/Header.js

// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import {
//   LoginLink,
//   LogoutLink,
//   useKindeBrowserClient,
// } from '@kinde-oss/kinde-auth-nextjs';
// import Image from 'next/image';

// const navLinks = [
//   {
//     href: '/',
//     label: 'Home',
//   },
//   {
//     href: '/timesheet',
//     label: 'Timesheet',
//     requiredPermissions: ['submit:timesheet'],
//   },
//   {
//     href: '/admin',
//     label: 'Admin',
//     requiredPermissions: ['delete-timesheet'],
//   },
// ];

// const Header = () => {
//   const pathname = usePathname();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { user, isAuthenticated } = useKindeBrowserClient();

//   return (
//     <header className='relative flex flex-col md:flex-row justify-between items-center py-4 px-7 border-b'>
//       <div className='flex justify-between items-center w-full md:w-auto'>
//         <Link href={'/'}>
//           <h1 className='text-xl font-semibold text-slate-700'>
//             Deer Park Timesheet
//           </h1>
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           className='md:hidden p-2 text-slate-700'
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? (
//             <span className='block w-6 h-6 text-center text-2xl'>&times;</span> // Close icon
//           ) : (
//             <span className='block w-6 h-6 text-center text-2xl'>&#9776;</span> // Menu icon
//           )}
//         </button>
//       </div>

//       {/* Desktop Menu */}
//       <nav className='hidden md:flex md:items-center'>
//         <ul className='flex gap-x-5 items-center text-[14px]'>
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 className={`text-zinc-500 ${
//                   pathname === link.href ? 'font-bold' : ''
//                 }`}
//                 href={link.href}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}

//           {/* Login/Logout and Profile Picture */}
//           <li className='ml-4'>
//             {isAuthenticated ? (
//               <div className='flex'>
//                 <LogoutLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg'>
//                   Logout
//                 </LogoutLink>
//                 <div className='ml-4 flex items-center'>
//                   {user?.picture ? (
//                     <Image
//                       src={user.picture}
//                       alt='Profile picture'
//                       width={30}
//                       height={30}
//                       className='rounded-full'
//                     />
//                   ) : (
//                     <div className='h-10 w-10 rounded-full bg-zinc-800 text-white text-center flex justify-center items-center'>
//                       {user?.given_name?.[0] || 'U'}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <LoginLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg'>
//                 Login
//               </LoginLink>
//             )}
//           </li>
//         </ul>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-y-0 left-0 bg-white shadow-lg md:hidden transform transition-transform duration-300 mt-20 rounded-e-3xl ${
//           isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//         style={{ zIndex: 999 }}
//       >
//         <nav className='w-60'>
//           <ul className='flex flex-col text-[14px] border-r border-gray-300 pt-4'>
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <Link
//                   className={`block text-zinc-500 px-4 py-2 ${
//                     pathname === link.href ? 'font-bold' : ''
//                   }`}
//                   href={link.href}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}

//             <div className='mt-3'>
//               {isAuthenticated ? (
//                 <>
//                   <li>
//                     <LogoutLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg ml-2'>
//                       Logout
//                     </LogoutLink>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <LoginLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg ml-2'>
//                     Login
//                   </LoginLink>
//                 </li>
//               )}
//             </div>

//             <div className='mt-40 px-4 '>
//               {/* User Profile Section in Mobile Menu */}
//               {isAuthenticated && (
//                 <>
//                   {user?.picture ? (
//                     <Image
//                       src={user.picture}
//                       alt='Profile picture'
//                       width={40}
//                       height={40}
//                       className='rounded-full mx-auto my-2'
//                     />
//                   ) : (
//                     <div className='h-10 w-10 rounded-full mx-auto bg-zinc-800 text-white text-center flex justify-center items-center'>
//                       {user?.given_name?.[0] || 'U'}
//                     </div>
//                   )}
//                   {user?.email && (
//                     <p className='text-center text-xs mb-3'>
//                       Logged in as {user.email}
//                     </p>
//                   )}
//                 </>
//               )}
//             </div>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// mainfolder/components/Header.js

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';

const navLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/timesheet',
    label: 'Timesheet',
    requiredPermissions: ['submit:timesheet'],
  },
  {
    href: '/admin',
    label: 'Admin',
    requiredPermissions: ['delete-timesheet'],
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useKindeBrowserClient();

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className='relative flex flex-col md:flex-row justify-between items-center py-4 px-7 border-b'>
      <div className='flex justify-between items-center w-full md:w-auto'>
        <Link href={'/'}>
          <h1 className='text-xl font-semibold text-slate-700'>
            Deer Park Timesheet
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 text-slate-700'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <span className='block w-6 h-6 text-center text-2xl'>&times;</span> // Close icon
          ) : (
            <span className='block w-6 h-6 text-center text-2xl'>&#9776;</span> // Menu icon
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className='hidden md:flex md:items-center'>
        <ul className='flex gap-x-5 items-center text-[14px]'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`text-zinc-500 ${
                  pathname === link.href ? 'font-bold' : ''
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Login/Logout and Profile Picture */}
          <li className='ml-4'>
            {isAuthenticated ? (
              <div className='flex'>
                <LogoutLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg'>
                  Logout
                </LogoutLink>
                <div className='ml-4 flex items-center'>
                  {user?.picture ? (
                    <Image
                      src={user.picture}
                      alt='Profile picture'
                      width={30}
                      height={30}
                      className='rounded-full'
                    />
                  ) : (
                    <div className='h-10 w-10 rounded-full bg-zinc-800 text-white text-center flex justify-center items-center'>
                      {user?.given_name?.[0] || 'U'}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <LoginLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg'>
                Login
              </LoginLink>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg md:hidden transform transition-transform duration-300 mt-20 rounded-e-3xl h-fit ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 999 }}
      >
        <nav className='w-60'>
          <ul className='flex flex-col text-[14px] border-r border-gray-300 pt-4'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className={`block text-zinc-500 px-4 py-2 ${
                    pathname === link.href ? 'font-bold' : ''
                  }`}
                  href={link.href}
                  onClick={closeMobileMenu} // Close menu on link click
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <div className='mt-3'>
              {isAuthenticated ? (
                <>
                  <li>
                    <LogoutLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg ml-2'>
                      Logout
                    </LogoutLink>
                  </li>
                </>
              ) : (
                <li>
                  <LoginLink className='text-white px-4 py-2 bg-slate-700 hover:bg-slate-900 hover:text-white transition duration-300 rounded-lg ml-2'>
                    Login
                  </LoginLink>
                </li>
              )}
            </div>

            <div className='mt-40 px-4 '>
              {/* User Profile Section in Mobile Menu */}
              {isAuthenticated && (
                <>
                  {user?.picture ? (
                    <Image
                      src={user.picture}
                      alt='Profile picture'
                      width={40}
                      height={40}
                      className='rounded-full mx-auto my-2'
                    />
                  ) : (
                    <div className='h-10 w-10 rounded-full mx-auto bg-zinc-800 text-white text-center flex justify-center items-center'>
                      {user?.given_name?.[0] || 'U'}
                    </div>
                  )}
                  {user?.email && (
                    <p className='text-center text-xs mb-3'>
                      Logged in as {user.email}
                    </p>
                  )}
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
