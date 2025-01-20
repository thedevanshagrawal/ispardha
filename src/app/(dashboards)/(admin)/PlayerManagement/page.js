'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDebounce } from 'use-debounce';
const PlayerManagement = () => {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        branch: "",
        house: "",
        mobile: "",
        gender: "",
    });
    const [houseFilter, setHouseFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [editingPlayerId, setEditingPlayerId] = useState(null);
    const [file, setFile] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    const [debouncedHouseFilter] = useDebounce(houseFilter, 500);
    const [debouncedGenderFilter] = useDebounce(genderFilter, 500);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchPlayers();
        }
    }, [session, status, router]);

    useEffect(() => {

        if (debouncedHouseFilter !== undefined || debouncedGenderFilter !== undefined) {
            fetchPlayers();
        }
    }, [debouncedHouseFilter, debouncedGenderFilter]);

    const fetchPlayers = async () => {
        try {
            let url = `/api/getAllPlayers`;
            if (debouncedHouseFilter || debouncedGenderFilter) {
                url += `?house=${debouncedHouseFilter}&gender=${debouncedGenderFilter}`;
            }
            const response = await axios.get(url);
            setPlayers(response.data.playerData);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddPlayer = async () => {
        try {
            await axios.post(`/api/createPlayer`, formData);
            fetchPlayers();
            setFormData({
                fullName: "",
                branch: "",
                house: "",
                mobile: "",
                gender: "",
            });
            toast.success("Player Added Successfully", {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleBulkUpload = async () => {
        if (!file) {
            toast.error("Please select a file to upload.", {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
            return;
        }

        const playerBulkData = new FormData();
        playerBulkData.append("file", file);

        try {
            const response = await axios.post(
                `/api/bulkCreatePlayers`,
                playerBulkData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            fetchPlayers();
            toast.success("Player Added Successfully", {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
        } catch (error) {
            console.error("Error bulk uploading players:", error);
            toast.error("Failed to upload players.", {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
        }
    };

    const handleUpdatePlayer = async () => {
        try {
            await axios.post(`/api/updatePlayer`, formData);
            fetchPlayers();
            setFormData({
                fullName: "",
                branch: "",
                house: "",
                mobile: "",
                gender: "",
            });
            setEditingPlayerId(null);
        } catch (error) {
            console.error("Error updating player:", error);
        }
    };

    const handleEdit = (player) => {
        setFormData({
            fullName: player.fullName,
            branch: player.branch,
            house: player.house,
            mobile: player.mobile,
            gender: player.gender,
        });
        setEditingPlayerId(player._id);
    };

    const deletePlayer = async (playerId) => {
        try {
            await axios.post("/api/deletePlayer", { playerId });
            fetchPlayers();
            toast.success("Player deleted successfully!");
        } catch (error) {
            console.error("Error deleting player:", error.message);
            toast.error("Failed to delete player.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <ToastContainer />
            <main className="max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10 p-6">
                <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
                    Manage Players
                </h2>

                <div className="flex justify-start items-center gap-5">
                    <div className="flex justify-between items-center mb-6">
                        <select
                            value={houseFilter}
                            onChange={(e) => {
                                setHouseFilter(e.target.value);
                                fetchPlayers();
                            }}
                            className="p-2 border border-gray-300 rounded-md bg-gray-50"
                        >
                            <option value="">All Houses</option>
                            <option value="Dominators">Dominators</option>
                            <option value="Terminators">Terminators</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <select
                            value={genderFilter}
                            onChange={(e) => {
                                setGenderFilter(e.target.value);
                                fetchPlayers();
                            }}
                            className="p-2 border border-gray-300 rounded-md bg-gray-50"
                        >
                            <option value="">Select Gender</option>
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Player Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="flex-1 min-w-[180px] p-2 border border-gray-300 rounded-md"
                        required
                    />


                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="flex-1 min-w-[180px] p-2 border border-gray-300 rounded-md bg-gray-50"
                        required
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                    </select>

                    <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="flex-1 min-w-[180px] p-2 border border-gray-300 rounded-md bg-gray-50"
                        required
                    >
                        <option value="" disabled>
                            Select Branch
                        </option>
                        <option value="B.TECH">B.TECH</option>
                        <option value="B.COM">B.COM</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                        <option value="BA">BA</option>
                        <option value="LLB">LLB</option>
                        <option value="B.ED">B.ED</option>
                        <option value="BSC">BSC</option>
                        <option value="MA">MA</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                    </select>
                    <select
                        name="house"
                        value={formData.house}
                        onChange={handleChange}
                        className="flex-1 min-w-[180px] p-2 border border-gray-300 rounded-md bg-gray-50"
                        required
                    >
                        <option value="" disabled>
                            Select House
                        </option>
                        <option value="Dominators">Dominators</option>
                        <option value="Terminators">Terminators</option>
                        <option value="Avengers">Avengers</option>
                        <option value="Challengers">Challengers</option>
                    </select>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile No."
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength="10"
                        pattern="\d{10}"
                        title="Please enter a valid 10-digit mobile number"
                        className="flex-1 min-w-[180px] p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <button
                        onClick={editingPlayerId ? handleUpdatePlayer : handleAddPlayer}
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
                    >
                        {editingPlayerId ? "Update Player" : "Add Player"}
                    </button>
                </div>

                <div className="mb-6 flex items-center gap-4 max-lg:flex-col max-lg:gap-3 max-lg:items-start">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".csv,.xlsx,.xls,.json"
                        className="p-2 max-lg:w-[90%] border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleBulkUpload}
                        className="bg-green-600 text-white px-4 py-2 rounded max-lg:w-[60%] max-lg:text-[12px]"
                    >
                        Upload Player Details
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border border-gray-300 p-2">S No.</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Gender</th>
                                <th className="border border-gray-300 p-2">Branch</th>
                                <th className="border border-gray-300 p-2">House</th>
                                <th className="border border-gray-300 p-2">Mobile No.</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
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
                                    <td className="border border-gray-300 p-2">{player.house}</td>
                                    <td className="border border-gray-300 p-2">
                                        {player.mobile}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="flex">
                                            <button
                                                onClick={() => handleEdit(player)}
                                                className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-3 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deletePlayer(player._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md ml-2"
                                            >
                                                Delete
                                            </button>
                                        </div>
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
            </main>
        </div>
    );
};

export default PlayerManagement;
