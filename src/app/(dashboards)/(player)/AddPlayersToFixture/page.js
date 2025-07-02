'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/utils/ThemeContext';

const AddPlayersToMatchFixture = () => {
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [selectedHouse, setSelectedHouse] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/");
        else fetchMatchFixtures();
    }, [session, status]);

    const fetchMatchFixtures = async () => {
        try {
            const userDataId = session.user.id;
            const response = await axios.post(`/api/matchFixtureDetails`, { userDataId });
            const { matchesWithHouse, result } = response.data;
            setMatches(matchesWithHouse);
            setPlayers(result);
        } catch (error) {
            console.error("Error fetching match fixtures:", error);
        }
    };

    const handleAddPlayers = async () => {
        if (!selectedMatch || !selectedHouse || selectedPlayers.length === 0) {
            toast.error("Please select a match, house, and at least one player.");
            return;
        }

        try {
            await axios.post(`/api/addPlayersToFixture`, {
                matchNumber: selectedMatch,
                house: selectedHouse,
                players: selectedPlayers,
                gender: selectedGender,
            });
            toast.success("Players added successfully!");
        } catch (error) {
            toast.error("Error adding players: " + error.response?.data?.message);
        }
    };

    const togglePlayerSelection = (playerId) => {
        setSelectedPlayers((prev) =>
            prev.includes(playerId)
                ? prev.filter((id) => id !== playerId)
                : [...prev, playerId]
        );
    };

    const inputStyle = `w-full p-3 border rounded-xl shadow-sm focus:outline-none transition-all duration-200 ${isDarkMode ? 'bg-gray-900 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`;
    const cardStyle = isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';

    return (
        <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'}`}>
            <ToastContainer />
            <div className={`max-w-5xl mx-auto p-8 rounded-3xl shadow-2xl border ${cardStyle}`}>
                <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                    Add Players to Match Fixture
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-1">Select Match Fixture</label>
                        <select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)} className={inputStyle}>
                            <option value="">Select Match</option>
                            {matches.map((match) => (
                                <option key={match.matchNumber} value={match.matchNumber}>
                                    {match.matchNumber} - {match.gameName || "No Game Name"}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Select House</label>
                        <select value={selectedHouse} onChange={(e) => setSelectedHouse(e.target.value)} className={inputStyle}>
                            <option value="">Select House</option>
                            {[...new Set(matches.map((m) => m.house))].map((house) => (
                                <option key={house} value={house}>{house}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Select Gender</label>
                        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className={inputStyle}>
                            <option value="">Select Gender</option>
                            {[...new Set(matches.map((m) => m.gender))].map((gender) => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Select Players</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            {players.map((player) => (
                                <div
                                    key={player.fullName}
                                    className={`p-4 border rounded-xl transition-all duration-200 cursor-pointer ${selectedPlayers.includes(player.fullName) ? 'bg-red-100 border-red-400' : isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                                    onClick={() => togglePlayerSelection(player.fullName)}
                                >
                                    <p><strong>Name:</strong> {player.fullName}</p>
                                    <p><strong>Branch:</strong> {player.branch}</p>
                                    <p><strong>Gender:</strong> {player.gender}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleAddPlayers} className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300">
                        Add Players
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPlayersToMatchFixture;