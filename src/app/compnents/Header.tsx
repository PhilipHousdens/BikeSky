"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';  // Use usePathname from next/navigation

export default function Header() {
    const [isClient, setIsClient] = useState(false);

    // Check if we're on the client side
    useEffect(() => {
        setIsClient(typeof window !== 'undefined');
    }, []);

    // Prevent rendering until we're sure we're on the client side
    if (!isClient) return null;

    const currentPath = usePathname();  // Use usePathname hook from next/navigation

    return (
        <header className="bg-black p-4 text-white">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <span className='text-bikeOrange'>BIKER</span> SKY
                </h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className={currentPath === '/' ? 'text-bikeOrange' : ''}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={currentPath === '/about' ? 'text-bikeOrange' : ''}>
                            ABOUT
                        </Link>
                    </li>
                    {/* Add other links as needed */}
                </ul>
            </nav>
        </header>
    );
}
