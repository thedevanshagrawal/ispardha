'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddPlayersToMatchFixture = () => {
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [selectedHouse, setSelectedHouse] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchMatchFixtures();
        }
    }, [session, status, router]);

    const fetchMatchFixtures = async () => {
        try {
            const userDataId = session.user.id
            const response = await axios.post(
                `/api/matchFixtureDetails`,{ userDataId }, {
                headers: {
                    'Authorization': `Bearer ${session.user.id}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
            );
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
            const formData = {
                matchNumber: selectedMatch,
                house: selectedHouse,
                players: selectedPlayers,
                gender: selectedGender,
            };

            await axios.post(
                `/api/addPlayersToFixture`,
                formData
            );
            toast.success("Players added successfully!");
        } catch (error) {
            toast.error("Error adding players: " + error.response?.data?.message);
        }
    };

    const togglePlayerSelection = (playerId) => {
        setSelectedPlayers((prevSelectedPlayers) =>
            prevSelectedPlayers.includes(playerId)
                ? prevSelectedPlayers.filter((id) => id !== playerId)
                : [...prevSelectedPlayers, playerId]
        );
    };

    return (
        <div className="font-sans bg-gray-100 p-4 sm:p-6">
            <div className="bg-white max-w-4xl mx-auto p-6 sm:p-8 rounded-lg shadow-lg">
                <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
                    Add Players to Match Fixture
                </h1>

                <div className="grid gap-4 sm:gap-6 max-w-2xl mx-auto">
                    <div className="form-group">
                        <label htmlFor="matchNumber" className="text-gray-700 font-medium">
                            Select Match Fixture:
                        </label>
                        <select
                            id="matchNumber"
                            value={selectedMatch}
                            onChange={(e) => setSelectedMatch(e.target.value)}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Match</option>
                            {matches.map((match) => (
                                <option key={match.matchNumber} value={match.matchNumber}>
                                    {match.matchNumber} - {match.gameName || "No Game Name"}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="house" className="text-gray-700 font-medium">
                            Select House:
                        </label>
                        <select
                            id="house"
                            value={selectedHouse}
                            onChange={(e) => setSelectedHouse(e.target.value)}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select House</option>
                            {matches
                                .map((match) => match.house)
                                .filter((house, index, self) => self.indexOf(house) === index)
                                .map((house) => (
                                    <option key={house} value={house}>
                                        {house}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender" className="text-gray-700 font-medium">
                            Select Gender:
                        </label>
                        <select
                            id="gender"
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            {matches
                                .map((match) => match.gender)
                                .filter((gender, index, self) => self.indexOf(gender) === index)
                                .map((gender) => (
                                    <option key={gender} value={gender}>
                                        {gender}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="text-gray-700 font-medium">Select Players:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            {players.map((player) => (
                                <div
                                    key={player.fullName}
                                    className={`p-3 border rounded-md cursor-pointer ${selectedPlayers.includes(player.fullName)
                                        ? "bg-blue-100"
                                        : "bg-gray-50"
                                        }`}
                                    onClick={() => togglePlayerSelection(player.fullName)}
                                >
                                    <p>
                                        <strong>Name:</strong> {player.fullName}
                                    </p>
                                    <p>
                                        <strong>Branch:</strong> {player.branch}
                                    </p>
                                    <p>
                                        <strong>Year:</strong> {player.year}
                                    </p>
                                    <p>
                                        <strong>Gender:</strong> {player.gender}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddPlayers}
                        className="w-full bg-blue-500 text-white p-2 sm:p-3 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Add Players
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddPlayersToMatchFixture;
