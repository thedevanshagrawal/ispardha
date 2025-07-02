'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/utils/ThemeContext';

const PointTable = () => {
    const [pointTable, setPointTable] = useState([]);
    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState({ house: "", gameName: "", points: "" });
    const [newGameName, setNewGameName] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/");
        else {
            fetchGames();
            fetchPoints();
        }
    }, [session, status]);

    const fetchPoints = async () => {
        try {
            const response = await axios.get(`/api/getPointTable`);
            setPointTable(response.data.pointTable);
        } catch (error) {
            toast.error("Failed to fetch point table.");
        }
    };

    const fetchGames = async () => {
        try {
            const response = await axios.get(`/api/getGames`);
            setGames(response.data.games);
        } catch (error) {
            toast.error("Failed to fetch games.");
        }
    };

    const handleAddPoints = async () => {
        if (!formData.gameName) return toast.error("Please provide a valid game name.");
        try {
            await axios.post(`/api/addPoints`, formData);
            fetchGames();
            fetchPoints();
            setFormData({ house: "", gameName: "", points: "" });
            toast.success("Points added successfully!");
        } catch (error) {
            toast.error("Failed to add points.");
        }
    };

    const handleAddGame = async () => {
        if (!newGameName.trim()) return toast.error("Game name cannot be empty.");
        try {
            await axios.post(`/api/addGame`, { gameName: newGameName });
            fetchGames();
            fetchPoints();
            setNewGameName("");
            toast.success("Game added successfully!");
        } catch (error) {
            toast.error("Failed to add game.");
        }
    };

    const handleResetPoints = async () => {
        try {
            await axios.post(`/api/resetPoints`, {});
            fetchGames();
            fetchPoints();
            toast.success("Points reset successfully!");
        } catch (error) {
            toast.error("Failed to reset points.");
        }
    };

    const calculateTotalPoints = (house) => pointTable.filter(item => item.house.toLowerCase() === house.toLowerCase()).reduce((sum, game) => sum + parseInt(game.points || 0), 0);
    const getPointsForHouseAndGame = (house, game) => {
        const pointData = pointTable.find(item => item.house.toLowerCase() === house.toLowerCase() && item.gameName.toLowerCase() === game.toLowerCase());
        return pointData ? pointData.points : 0;
    };
    const deleteGame = async (gameName) => {
        try {
            await axios.post(`/api/deleteGame`, { gameName });
            fetchGames();
            fetchPoints();
            toast.success("Game deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete game.");
        }
    };

    const inputStyle = `w-full p-3 border rounded-md shadow-sm focus:outline-none transition-all duration-200 ${isDarkMode ? 'bg-gray-900 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`;
    const containerStyle = isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black';

    return (
        <div className={`min-h-screen ${containerStyle} p-6`}>
            <ToastContainer autoClose={3000} />
            <div className={`max-w-6xl mx-auto p-8 rounded-3xl shadow-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}>
                <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Point Table Management
                </h1>

                {/* Form */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <select name="house" value={formData.house} onChange={(e) => setFormData({ ...formData, house: e.target.value })} className={inputStyle}>
                        <option value="">Select House</option>
                        <option value="Dominators">Dominators</option>
                        <option value="Terminators">Terminators</option>
                        <option value="Avengers">Avengers</option>
                        <option value="Challengers">Challengers</option>
                    </select>
                    <input type="text" name="gameName" value={formData.gameName} onChange={(e) => setFormData({ ...formData, gameName: e.target.value })} className={inputStyle} placeholder="Enter Game Name" />
                    <input type="number" name="points" value={formData.points} onChange={(e) => setFormData({ ...formData, points: e.target.value })} className={inputStyle} placeholder="Enter Points" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <button onClick={handleAddPoints} className="w-full py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600">Add Points</button>
                    <input type="text" value={newGameName} onChange={(e) => setNewGameName(e.target.value)} className={inputStyle} placeholder="Add New Game" />
                    <button onClick={handleAddGame} className="w-full py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">Add Game</button>
                </div>
                <button onClick={handleResetPoints} className="w-full mt-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700">Reset All Points</button>

                {/* Table */}
                <div className="overflow-x-auto mt-10">
                    <table className="w-full text-sm md:text-base border border-gray-600 rounded-xl overflow-hidden">
                        <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                            <tr>
                                <th className="p-3 border">Game Name</th>
                                {["Dominators", "Terminators", "Avengers", "Challengers"].map(house => (
                                    <th key={house} className="p-3 border text-center">{house}</th>
                                ))}
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                                    <td className="p-3 border text-center font-medium">{game}</td>
                                    {["Dominators", "Terminators", "Avengers", "Challengers"].map(house => (
                                        <td key={house} className="p-3 border text-center">{getPointsForHouseAndGame(house, game)}</td>
                                    ))}
                                    <td className="p-3 border text-center">
                                        <button onClick={() => deleteGame(game)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-200 font-bold">
                                <td className="p-3 border text-center">Total Points</td>
                                {["Dominators", "Terminators", "Avengers", "Challengers"].map(house => (
                                    <td key={`total-${house}`} className="p-3 border text-center">{calculateTotalPoints(house)}</td>
                                ))}
                                <td className="p-3 border"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PointTable;
