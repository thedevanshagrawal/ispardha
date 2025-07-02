'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/utils/ThemeContext';
import { toast } from 'react-toastify';

const MatchFixtureDetails = () => {
    const [matchFixture, setMatchFixture] = useState([]);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        fetchMatchFixture();
    }, []);

    const fetchMatchFixture = async () => {
        try {
            const response = await axios.get('/api/getAllMatchFixture');
            setMatchFixture(response.data.matchFixtureDetails);
        } catch (error) {
            console.error("Error fetching match fixture:", error);
            toast.error("Failed to fetch match fixtures. Please try again.");
        }
    };

    return (
        <div className={` pt-28 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} min-h-screen py-10 px-4`}>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Match Fixture Details
                </h2>

                <div className={`overflow-x-auto rounded-xl ${isDarkMode ? 'bg-gray-950' : 'bg-white'} shadow-xl border border-gray-600`}>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-left">
                                <th className="px-6 py-3 border border-gray-600">Match No.</th>
                                <th className="px-6 py-3 border border-gray-600">Game</th>
                                <th className="px-6 py-3 border border-gray-600">House 1</th>
                                <th className="px-6 py-3 border border-gray-600">House 2</th>
                                <th className="px-6 py-3 border border-gray-600">Gender</th>
                                <th className="px-6 py-3 border border-gray-600">Time</th>
                                <th className="px-6 py-3 border border-gray-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchFixture.length > 0 ? (
                                matchFixture.map((match, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b`}
                                    >
                                        <td className="px-6 py-4 border-gray-600 border">{match.matchNumber}</td>
                                        <td className="px-6 py-4 border-gray-600 border">{match.gameName}</td>
                                        <td className="px-6 py-4 border-gray-600 border">{match.teams?.[0]?.house}</td>
                                        <td className="px-6 py-4 border-gray-600 border">{match.teams?.[1]?.house}</td>
                                        <td className="px-6 py-4 border-gray-600 border capitalize">{match.gender}</td>
                                        <td className="px-6 py-4 border-gray-600 border">{match.matchTime}</td>
                                        <td className="px-6 py-4 border-gray-600 border">{match.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-6 text-gray-400">
                                        No match fixtures found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MatchFixtureDetails;
