'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PointTable = () => {
    const [pointTable, setPointTable] = useState([]);
    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState({
        house: "",
        gameName: "",
        points: "",
    });
    const [newGameName, setNewGameName] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchGames();
            fetchPoints();
        }
    }, [session, status, router]);

    const fetchPoints = async () => {
        try {
            const response = await axios.get(
                `/api/getPointTable`
            );
            setPointTable(response.data.pointTable);
        } catch (error) {
            toast.error("Failed to fetch point table.", error);
        }
    };
    
    const fetchGames = async () => {
        try {
            const response = await axios.get(`/api/getGames`);
            setGames(response.data.games);
        } catch (error) {
            toast.error("Failed to fetch games.", error);
        }
    };

    const handleAddPoints = async () => {
        if (!formData.gameName) {
            toast.error("Please provide a valid game name.");
            return;
        }

        try {
            await axios.post(`/api/addPoints`, formData);
            fetchGames();
            fetchPoints();
            setFormData({ house: "", gameName: "", points: "" });
            toast.success("Points added successfully!");
        } catch (error) {
            toast.error("Failed to add points.", error);
        }
    };

    const handleAddGame = async () => {
        if (!newGameName.trim()) {
            toast.error("Game name cannot be empty.");
            return;
        }

        try {
            await axios.post(
                `/api/addGame`,
                { gameName: newGameName }
               
            );
            fetchGames();
            fetchPoints();
            setNewGameName("");
            toast.success("Game added successfully!");
        } catch (error) {
            toast.error("Failed to add game.", error);
        }
    };

    const handleResetPoints = async () => {
        try {
            await axios.post(
                `/api/resetPoints`,
                {},
            );
            fetchGames();
            fetchPoints();
            toast.success("Points reset successfully!");
        } catch (error) {
            toast.error("Failed to reset points.", error);
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

    const deleteGame = (gameName) => {
        try {
            axios.post(
                `/api/deleteGame`,
                { gameName },
            );

            fetchGames();
            fetchPoints();
            toast.success("Game deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete game.", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <ToastContainer autoClose={3000} />
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">
                    Point Table Management
                </h1>

                <div className="space-y-4">
                    {/* Form to Add Points */}
                    <div>
                        <label className="block text-gray-600 font-medium">House</label>
                        <select
                            name="house"
                            value={formData.house}
                            onChange={(e) =>
                                setFormData({ ...formData, house: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select</option>
                            <option value="Dominator">Dominator</option>
                            <option value="Terminator">Terminator</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium">Game Name</label>
                        <input
                            type="text"
                            name="gameName"
                            value={formData.gameName}
                            onChange={(e) =>
                                setFormData({ ...formData, gameName: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter New Game Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium">Points</label>
                        <input
                            type="number"
                            name="points"
                            value={formData.points}
                            onChange={(e) =>
                                setFormData({ ...formData, points: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter Points"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleAddPoints}
                        className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Add Points
                    </button>

                    <button
                        onClick={handleResetPoints}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        Reset All Points
                    </button>
                </div>

                {/* Game and Point Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="p-2 border text-center">Game Name</th>
                                {["Dominator", "Terminator", "Avengers", "Challengers"].map(
                                    (house) => (
                                        <th key={house} className="p-2 border text-center">
                                            {house}
                                        </th>
                                    )
                                )}
                                <th className="p-2 border text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game} className="hover:bg-gray-100">
                                    <td className="p-2 border text-center font-medium">{game}</td>
                                    {["Dominator", "Terminator", "Avengers", "Challengers"].map(
                                        (house) => (
                                            <td key={house} className="p-2 border text-center">
                                                {getPointsForHouseAndGame(house, game)}
                                            </td>
                                        )
                                    )}
                                    <td className="p-2 border text-center font-medium">
                                        <button
                                            onClick={() => deleteGame(game)}
                                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* Total Points Row */}
                            <tr className="bg-gray-200 font-bold">
                                <td className="p-2 border text-center">Total Points</td>
                                {["Dominator", "Terminator", "Avengers", "Challengers"].map(
                                    (house) => {
                                        const total = calculateTotalPoints(house);
                                        return (
                                            <td
                                                key={`total-${house}`}
                                                className="p-2 border text-center"
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
    );
};

export default PointTable;
