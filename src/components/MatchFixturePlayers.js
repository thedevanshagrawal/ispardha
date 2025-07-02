"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@/utils/ThemeContext";

const MatchFixturePlayers = () => {
    const [match, setMatch] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [players, setPlayers] = useState([]);
    const { isDarkMode } = useTheme();

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

    const getUniqueHouses = (players) => {
        const houses = players.map((player) => player.house);
        return [...new Set(houses)];
    };

    return (
        <div className={`px-6 pb-6 pt-28 min-h-screen ${isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"}`}>
            <h1 className="text-3xl font-black text-center mb-10 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Match Fixture Players
            </h1>

            {/* Games Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {match.length > 0 ? (
                    match.map((game, index) => (
                        <div
                            key={index}
                            onClick={() => handleGameClick(game)}
                            className="cursor-pointer py-5 px-4 text-center rounded-xl shadow-md border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg
                                bg-gradient-to-br from-red-50 to-orange-100 hover:from-red-100 hover:to-orange-200 text-red-700 font-semibold"
                        >
                            {game?.gameName}
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-400">No games available.</p>
                )}
            </div>

            {/* Players for selected game */}
            {selectedGame && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Players for{" "}
                        <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                            {selectedGame}
                        </span>
                    </h2>

                    {players.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {getUniqueHouses(players).slice(0, 2).map((house, houseIndex) => (
                                <div
                                    key={houseIndex}
                                    className={`flex-1 rounded-2xl p-6 shadow-lg border-2 transition-all transform hover:scale-105 ${isDarkMode
                                            ? "bg-gray-900 border-gray-700 hover:border-orange-500"
                                            : "bg-white border-gray-300 hover:border-red-500"
                                        }`}
                                >
                                    <h3 className="text-xl font-bold text-center mb-4 capitalize bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                                        {house}
                                    </h3>
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr
                                                className={`${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-orange-50 text-red-700"
                                                    }`}
                                            >
                                                <th className="p-2 border border-gray-300">S No.</th>
                                                <th className="p-2 border border-gray-300">Name</th>
                                                <th className="p-2 border border-gray-300">Gender</th>
                                                <th className="p-2 border border-gray-300">Branch</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {players
                                                .filter((p) => p.house === house)
                                                .map((player, idx) => (
                                                    <tr
                                                        key={player._id}
                                                        className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-orange-50"}
                                                    >
                                                        <td className="border border-gray-300 p-2 text-center">{idx + 1}</td>
                                                        <td className="border border-gray-300 p-2">{player.fullName}</td>
                                                        <td className="border border-gray-300 p-2">{player.gender}</td>
                                                        <td className="border border-gray-300 p-2">{player.branch}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">No players found for this game.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchFixturePlayers;
