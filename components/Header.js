// // mainfolder/components/Header.js

'use client';
// import Image from 'next/image';
// import logo from '../../public/dplogo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/timesheet',
    label: 'Timesheet',
  },
  {
    href: '/admin',
    label: 'Admin',
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='flex justify-between items-center py-4 px-7 border-b'>
      <Link href={'/'}>
        {/* <Image src={logo} alt='logo' width={40} height={40} /> */}
        <h1 className='text-xl font-semibold text-slate-700'>
          Deer Park Timesheet
        </h1>
      </Link>

      <nav>
        <ul className='flex gap-x-5 text-[14px]'>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
