'use client';
import Link from 'next/link';
import React from 'react';
import { Trophy, Users, Calendar, Target, Medal, Flame, Shield, Zap, ArrowRight } from 'lucide-react';
import { useTheme } from '@/utils/ThemeContext';

const HomePage = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen pt-28 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'}`}>
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-6 text-center pb-20">
                <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text mb-4">
                    Welcome to i-Spardha
                </h1>
                <p className="text-lg sm:text-xl max-w-3xl mb-6">
                    The annual sports championship of ICFAI University, Raipur – Unite, Compete, and Conquer for your house!
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Link href="/match-fixture" className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all font-semibold">
                        <Calendar className="inline-block mr-2" size={20} /> Match Fixtures
                    </Link>
                    <Link href="/point-table" className={`border-2 px-6 py-3 rounded-lg transition-all font-semibold ${isDarkMode ? 'border-gray-500 text-white hover:bg-gray-800' : 'border-red-500 text-red-600 hover:bg-red-50'}`}>
                        <Trophy className="inline-block mr-2" size={20} /> Point Table
                    </Link>
                </div>


            </section>

            {/* Houses Section */}
            <section className={`py-20 px-6 relative overflow-hidden ${isDarkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50'
                }`}>
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                                Battle of the
                            </span>
                            <span className={`block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Houses
                            </span>
                        </h2>
                        <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            Four legendary houses, one ultimate champion. Which house will rise to glory in this epic sporting battle?
                        </p>
                    </div>

                    {/* Houses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Dominators",
                                description: "Champions of strength and resilience, always pushing boundaries to achieve greatness.",
                                icon: Flame,
                                gradient: "from-red-500 to-pink-600",
                                bgColor: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                            },
                            {
                                name: "Terminators",
                                description: "Masters of strategy and precision, terminating the competition with tactical excellence.",
                                icon: Zap,
                                gradient: "from-yellow-500 to-orange-500",
                                bgColor: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                            },
                            {
                                name: "Avengers",
                                description: "Fierce and fearless warriors, avenging their way to victory with unmatched determination.",
                                icon: Shield,
                                gradient: "from-green-500 to-emerald-600",
                                bgColor: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                            },
                            {
                                name: "Challengers",
                                description: "Bold and daring competitors, taking on every challenge with relentless fighting spirit.",
                                icon: Target,
                                gradient: "from-purple-500 to-violet-600",
                                bgColor: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                            }
                        ].map((house, index) => (
                            <div
                                key={index}
                                className={`group relative rounded-3xl p-8 border-2 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${isDarkMode
                                    ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-blue-400/50 hover:bg-gray-800'
                                    : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-400/50 hover:bg-white shadow-lg'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 bg-gradient-to-br ${house.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <house.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {house.name}
                                </h3>
                                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {house.description}
                                </p>

                                {/* Hover Effect */}
                                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-300 bg-gradient-to-br ${house.gradient} -z-10 blur-xl`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-20 px-6 relative overflow-hidden ${isDarkMode ? 'bg-gray-950' : 'bg-white'
                }`}>
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                                Event
                            </span>
                            <span className={`block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Highlights
                            </span>
                        </h2>
                        <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            Experience the thrill of competition and the joy of sportsmanship in our premier athletic championship.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Exciting Competitions",
                                description: "Participate in diverse sports events and showcase your athletic prowess across multiple disciplines.",
                                icon: Target,
                                gradient: "from-blue-500 to-indigo-600"
                            },
                            {
                                title: "Team Spirit",
                                description: "Strengthen bonds with your peers as you compete together and build lasting friendships.",
                                icon: Users,
                                gradient: "from-green-500 to-emerald-600"
                            },
                            {
                                title: "Championship Glory",
                                description: "Compete for ultimate victory and bring honor to your house in this epic sporting battle.",
                                icon: Trophy,
                                gradient: "from-yellow-500 to-orange-600"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`group relative rounded-3xl p-8 border-2 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${isDarkMode
                                    ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-blue-400/50 hover:bg-gray-800'
                                    : 'bg-gray-50/80 backdrop-blur-sm border-gray-200 hover:border-blue-400/50 hover:bg-white shadow-lg'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {feature.title}
                                </h3>
                                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {feature.description}
                                </p>

                                {/* Hover Effect */}
                                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient} -z-10 blur-xl`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default HomePage;
