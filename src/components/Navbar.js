"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/utils/ThemeContext";

const Navbar = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        setMounted(true);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest("nav")) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Match Fixtures", href: "/match-fixture" },
        { name: "Match Fixtures Players", href: "/match-fixture-player" },
        { name: "Point Table", href: "/point-table" }
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full py-1 z-50 transition-all duration-500 ease-out ${scrolled
            ? "bg-gray-950 backdrop-blur-xl border-b border-red-600/30 shadow-2xl shadow-black/20"
            : "bg-transparent"
            } ${mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>

            <div className="relative px-1 mx-8 flex justify-between items-center py-[6px]">
                {/* Logo */}
                <Link href="/" className="relative group flex items-center z-10">
                    <Image src="/i-spardha.png" alt="i-Spardha Logo" width={220} height={60} />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-5 py-2 rounded-md font-semibold transition-all duration-300
                            ${isDarkMode
                                    ? "text-gray-300 hover:text-white hover:bg-gray-800/40"
                                    : "text-gray-700 hover:text-red-600 hover:bg-red-100"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Auth Button */}
                    {session ? (
                        <Button
                            onClick={() => signOut()}
                            className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-5 py-2 rounded-md hover:scale-105 transition-transform duration-300"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    ) : (
                        <Link
                            href="/login"
                            className="border-2 border-red-500 text-red-600 font-semibold px-5 py-2 rounded-md hover:bg-red-50 transition-all duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(!menuOpen);
                    }}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen && i === 0 ? "transform translate-y-2 rotate-45" : ""} 
                            ${menuOpen && i === 2 ? "transform -translate-y-2 -rotate-45" : ""} 
                            ${menuOpen && i === 1 ? "opacity-0" : ""}
                            ${isDarkMode ? "bg-gray-300" : "bg-black"}
                            `}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full ${isDarkMode ? 'bg-gray-950' : 'bg-white'} border-t border-red-500/10 transition-all duration-300 transform origin-top ${menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}>
                <div className="flex flex-col p-6 space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`p-3 rounded-md font-medium transition duration-300 ${isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-800 hover:bg-red-100"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-5 py-2 rounded-md hover:scale-105 transition-transform duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className={`p-3  rounded-md font-medium ${isDarkMode ? "text-white hover:bg-gray-800" : "text-red-600 hover:bg-red-100"}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
