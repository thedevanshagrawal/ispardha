'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        if (!isMenuOpen) {
            // Close the menu automatically after 2 seconds
            setTimeout(() => setIsMenuOpen(false), 2000);
        }
    };

    // Close the menu if the user clicks outside it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-8">
                {/* Logo Section */}
                <div className="text-3xl font-extrabold tracking-wider text-white">
                    i-spardha
                </div>

                {/* Hamburger Menu for Smaller Screens */}
                <button
                    className="text-white md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Menu Items */}
                <div
                    ref={menuRef}
                    className={`${isMenuOpen ? "block" : "hidden"
                        } absolute top-16 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-800 md:flex md:static md:w-auto md:gap-8 text-center md:text-left p-4 md:p-0 z-10`}
                >
                    <ul className="flex md:flex-row gap-6 text-lg md:text-base">
                        {session ? (
                            <button
                                onClick={() => signOut()}
                                className="text-white hover:text-blue-200 px-4 py-1 rounded-lg transition-all duration-300"
                            >
                                Logout
                            </button>
                        ) : (
                            <ul className="flex md:flex-row gap-6 text-lg md:text-base">
                                <li>
                                    <Link
                                        href="/"
                                        aria-label="Home"
                                        className="text-white hover:text-blue-200 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        aria-label="match-fixture"
                                        href="/match-fixture"
                                        className="text-white hover:text-blue-200 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        Match Fixtures
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        aria-label="match-fixture"
                                        href="/match-fixture-player"
                                        className="text-white hover:text-blue-200 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        Match Fixtures Players
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        aria-label="point-table"
                                        href="/point-table"
                                        className="text-white hover:text-blue-200 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        Point Table
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        aria-label="login"
                                        href="/login"
                                        className="text-white hover:text-blue-200 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </ul>

                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
