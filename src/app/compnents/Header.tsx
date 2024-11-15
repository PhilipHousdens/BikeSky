"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [pathname, setPathname] = useState<string>('');
  
  // useEffect to safely update pathname on the client-side only
  useEffect(() => {
    setPathname(window.location.pathname); // Directly using window.location.pathname
  }, []);
  
  // Ensure pathname is updated after mount
  if (pathname === '') {
    return null; // Avoid rendering until pathname is set
  }

  return (
    <header className="bg-black p-4 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-quantico">
          <span className='text-bikeOrange font-orbitron'>BIKER</span> SKY
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={pathname === '/' ? 'text-bikeOrange font-quantico' : 'font-quantico'}>
              HOME
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'text-bikeOrange font-quantico' : 'font-quantico'}>
              ABOUT
            </Link>
          </li>
          {/* Add other links as needed */}
        </ul>
      </nav>
    </header>
  );
}
