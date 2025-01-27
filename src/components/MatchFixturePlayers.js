"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const MatchFixturePlayers = () => {
    const [match, setMatch] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [players, setPlayers] = useState([]);


    useEffect(() => {
        fetchMatch();
    }, []);


    const fetchMatch = async () => {
        try {
            const response = await axios.get("/api/getMatchFixturePlayers");
            setMatch(response.data.matchResults);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const handleGameClick = (game) => {
        setSelectedGame(game.gameName);
        setPlayers(game.players);
    };

    // Filter unique house names from the fetched players
    const getUniqueHouses = (players) => {
        const houses = players.map(player => player.house);
        return [...new Set(houses)]; // Return unique house names
    };


    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Match Fixture Players</h1>

            {/* Display list of games */}
            <div className="space-y-6">
                {match.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-6">
                        {match.map((game, index) => (
                            <div
                                key={index}
                                onClick={() => handleGameClick(game)}
                                className="cursor-pointer py-4 bg-blue-100 rounded-lg shadow-lg hover:bg-blue-200 transition-all ease-in-out transform hover:scale-105"
                            >
                                <h3 className="text-lg font-medium text-center text-gray-700">{game?.gameName}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No games available.</p>
                )}
            </div>

            {/* Show players of the selected game in "VS" format */}
            {selectedGame && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Players for {selectedGame}</h2>
                    {players.length > 0 ? (
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                            {/* Loop through the two houses */}
                            {getUniqueHouses(players).slice(0, 2).map((house, houseIndex) => (
                                <div
                                    key={houseIndex}
                                    className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all ease-in-out transform hover:scale-105 w-full lg:w-1/2"
                                >
                                    <h3 className="text-xl mb-2 font-semibold text-center text-blue-500 capitalize">{house}</h3>
                                    <table className="w-full border-collapse border border-gray-200 text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border border-gray-300 p-2">S No.</th>
                                                <th className="border border-gray-300 p-2">Name</th>
                                                <th className="border border-gray-300 p-2">Gender</th>
                                                <th className="border border-gray-300 p-2">Branch</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {players.filter(player => player.house === house).map((player, index) => (
                                                <tr key={player._id}>
                                                    <td className="border border-gray-300 p-2 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border border-gray-300 p-2">
                                                        {player.fullName}
                                                    </td>
                                                    <td className="border border-gray-300 p-2">
                                                        {player.gender}
                                                    </td>
                                                    <td className="border border-gray-300 p-2">
                                                        {player.branch}
                                                    </td>
                                                </tr>
                                            ))}
                                            {players.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="border border-gray-300 p-2 text-center"
                                                    >
                                                        No players found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No players available for this game.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default MatchFixturePlayers
