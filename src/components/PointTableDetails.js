'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from '@/utils/ThemeContext';

const PointTableDetails = () => {
    const [pointTable, setPointTable] = useState([]);
    const [games, setGames] = useState([]);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        fetchGames();
        fetchPoints();
    }, []);

    const fetchPoints = async () => {
        try {
            const response = await axios.get(`/api/getPointTable`);
            setPointTable(response.data.pointTable);
        } catch (error) {
            console.error("Failed to fetch point table:", error);
        }
    };

    const fetchGames = async () => {
        try {
            const response = await axios.get(`/api/getGames`);
            setGames(response.data.games);
        } catch (error) {
            console.error("Failed to fetch games:", error);
        }
    };

    const calculateTotalPoints = (house) => {
        return pointTable
            .filter((item) => item.house.toLowerCase() === house.toLowerCase())
            .reduce((sum, game) => sum + parseInt(game.points || 0), 0);
    };

    const getPointsForHouseAndGame = (house, game) => {
        const pointData = pointTable.find(
            (item) =>
                item.house.toLowerCase() === house.toLowerCase() &&
                item.gameName.toLowerCase() === game.toLowerCase()
        );
        return pointData ? pointData.points : 0;
    };

    const cardStyle = isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';
    const containerStyle = isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black';

    return (
        <div className={`min-h-screen ${containerStyle} p-6 flex items-center justify-center`}>
            <div className={`rounded-3xl shadow-2xl p-8 w-full max-w-6xl border ${cardStyle}`}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Housewise Point Table
                </h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm md:text-base border border-gray-600 rounded-xl overflow-hidden">
                        <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                            <tr>
                                <th className="p-3 border text-center">Game Name</th>
                                {['Dominators', 'Terminators', 'Avengers', 'Challengers'].map((house) => (
                                    <th key={house} className="p-3 border text-center">{house}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {games.length > 0 ? (
                                games.map((game) => (
                                    <tr key={game} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                                        <td className="p-3 border text-center font-semibold">{game}</td>
                                        {['Dominators', 'Terminators', 'Avengers', 'Challengers'].map((house) => (
                                            <td key={house} className="p-3 border text-center">
                                                {getPointsForHouseAndGame(house, game)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 border text-center text-gray-400">No data available.</td>
                                </tr>
                            )}
                            <tr className="bg-gradient-to-r from-red-100 to-orange-100 font-bold text-black">
                                <td className="p-3 border text-center">Total Points</td>
                                {['Dominators', 'Terminators', 'Avengers', 'Challengers'].map((house) => (
                                    <td key={`total-${house}`} className="p-3 border text-center">
                                        {calculateTotalPoints(house)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PointTableDetails;
