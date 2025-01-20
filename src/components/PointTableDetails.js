'use client'
import { useState, useEffect } from "react";
import axios from "axios";

const PointTableDetails = () => {
    const [pointTable, setPointTable] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
        fetchPoints();
    }, []);

    const fetchPoints = async () => {
        try {
            const response = await axios.get(
                `/api/getPointTable`
            );
            setPointTable(response.data.pointTable); // Update the point table data
        } catch (error) {
            console.error("Failed to fetch point table:", error);
        }
    };

    // Fetch Game List from Backend API
    const fetchGames = async () => {
        try {
            const response = await axios.get(`/api/getGames`);
            setGames(response.data.games); // Update the list of games
        } catch (error) {
            console.error("Failed to fetch games:", error);
        }
    };

    // Calculate Total Points for a House
    const calculateTotalPoints = (house) => {
        return pointTable
            .filter((item) => item.house.toLowerCase() === house.toLowerCase()) // Normalize house names
            .reduce((sum, game) => sum + parseInt(game.points || 0), 0);
    };

    // Get Points for a Specific House and Game
    const getPointsForHouseAndGame = (house, game) => {
        const pointData = pointTable.find(
            (item) =>
                item.house.toLowerCase() === house.toLowerCase() &&
                item.gameName.toLowerCase() === game.toLowerCase()
        );
        return pointData ? pointData.points : 0;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="bg-white -mt-16 rounded-lg shadow-lg p-6 w-full max-w-5xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 text-center">
                    Point Table
                </h1>

                {/* Point Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="p-3 border text-center">Game Name</th>
                                {["Dominators", "Terminators", "Avengers", "Challengers"].map(
                                    (house) => (
                                        <th key={house} className="p-3 border text-center">
                                            {house}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {games.length > 0 ? (
                                games.map((game) => (
                                    <tr key={game} className="hover:bg-gray-100">
                                        <td className="p-3 border text-center font-medium">
                                            {game}
                                        </td>
                                        {["Dominators", "Terminators", "Avengers", "Challengers"].map(
                                            (house) => (
                                                <td key={house} className="p-3 border text-center">
                                                    {getPointsForHouseAndGame(house, game)}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-3 border text-center text-gray-500"
                                    >
                                        No data available.
                                    </td>
                                </tr>
                            )}
                            {/* Total Points Row */}
                            <tr className="bg-gray-200 font-bold">
                                <td className="p-3 border text-center">Total Points</td>
                                {["Dominators", "Terminators", "Avengers", "Challengers"].map(
                                    (house) => {
                                        const total = calculateTotalPoints(house);
                                        return (
                                            <td
                                                key={`total-${house}`}
                                                className="p-3 border text-center"
                                            >
                                                {total}
                                            </td>
                                        );
                                    }
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PointTableDetails
