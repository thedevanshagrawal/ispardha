"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "@/utils/ThemeContext";

export default function Footer() {
    const { isDarkMode } = useTheme();
    const { data: session, status } = useSession();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Hide footer if session exists
    if (session) return null;

    return (
        <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-50 pointer-events-none z-0" />

            {/* Animated lights/particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(25)].map((_, i) => {
                    const size = [1, 2, 3][i % 3];
                    const top = (i * 7) % 100;
                    const left = (i * 13) % 100;
                    const scale = (Math.random() * 0.6 + 1).toFixed(5);
                    const colors = ["bg-red-500/20", "bg-orange-500/20", "bg-yellow-500/20"];
                    const color = colors[i % 3];
                    return (
                        <div
                            key={i}
                            className={`absolute rounded-full ${color}`}
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                transform: `scale(${scale})`,
                                animation: `pulse ${2 + (i % 3)}s infinite`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Footer Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pl-4">
                    {/* Brand Logo & Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/i-spardha.png" alt="Mahabandhan Logo" width={293} height={64} />
                        </div>
                        <p className="text-gray-400">
                            The ultimate sports championship bringing together
                        </p>
                        <p className="text-gray-400 mb-6">
                            the best athletes and unforgettable moments.
                        </p>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} i-spardha. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Login", href: "/login" },
                                { label: "Match Fixture", href: "/match-fixture" },
                                { label: "Match Fixture Player", href: "/match-fixture-player" },
                                { label: "Point Table", href: "/point-table" },
                            ].map(({ label, href }, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={href}
                                        className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* University Info */}
                    <div className="text-center lg:text-right">
                        <h3 className="text-xl font-bold mb-4 text-white">The ICFAI University</h3>
                        <p className="text-blue-200 leading-relaxed">
                            Raipur, Chhattisgarh
                        </p>
                        <div className="mt-6 flex justify-center lg:justify-end space-x-4">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>

                    {/* Policies */}
                    {/* <div className="sm:pl-40">
                        <h3 className="text-white font-medium mb-4">Policies</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Terms of Services", href: "/terms-of-services" },
                                { label: "Privacy Policy", href: "/privacy-policy" },
                            ].map(({ label, href }, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={href}
                                        className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>

                {/* Mahabandhan Branding Text */}
                <div className="mt-16 text-center relative z-10">
                    <span className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent transition-all duration-300">
                        I-SPARDHA
                    </span>
                </div>
            </div>
        </footer>
    );
}
