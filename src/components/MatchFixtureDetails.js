'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MatchFixtureDetails = () => {
    const [MatchFixture, setMatchFixture] = useState([]);

    useEffect(() => {
        fetchMatchFixture();
    }, [])

    const fetchMatchFixture = async () => {
        try {
            const response = await axios.get(
                `/api/getAllMatchFixture`
            );
            setMatchFixture(response.data.matchFixtureDetails);
        } catch (error) {
            console.error("Error fetching match fixture:", error);
            toast.error("Failed to fetch match fixtures. Please try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Match Fixture Details</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-6 py-3 text-sm font-medium">Match Number</th>
                            <th className="px-6 py-3 text-sm font-medium">Game Name</th>
                            <th className="px-6 py-3 text-sm font-medium">House 1</th>
                            <th className="px-6 py-3 text-sm font-medium">House 2</th>
                            <th className="px-6 py-3 text-sm font-medium">Gender</th>
                            <th className="px-6 py-3 text-sm font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MatchFixture.map((match, index) => (
                            <tr key={index} className="hover:bg-blue-50">
                                <td className="px-6 py-4 text-sm text-gray-700">{match.matchNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{match.gameName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{match.teams[0].house}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{match.teams[1].house}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{match.gender}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{match.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MatchFixtureDetails
