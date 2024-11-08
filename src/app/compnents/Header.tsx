import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-black p-4 text-white">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold"><span className='text-bikeOrange'>BIKE</span> SKY</h1>
                <ul className="flex space-x-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                {/* Add other links as needed */}
                </ul>
            </nav>
        </header>
    );
}