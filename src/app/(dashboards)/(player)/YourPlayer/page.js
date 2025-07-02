'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/utils/ThemeContext';

const YourPlayer = () => {
    const [players, setPlayers] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchPlayers();
        }
    }, [session, status, router]);

    const fetchPlayers = async () => {
        try {
            const response = await axios.post("/api/getPlayersByHouseName", {
                userDataId: session.user.id,
            });
            setPlayers(response.data.playerData);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const containerStyle = isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black';

    return (
        <div className={`min-h-screen ${containerStyle} p-6`}>
            <div className={`rounded-3xl shadow-2xl p-6 w-full max-w-6xl mx-auto border ${isDarkMode ? 'border-gray-700 bg-gray-950' : 'border-gray-300 bg-white'}`}>
                <h3 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                    Your House Players
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm md:text-base border border-gray-600">
                        <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                            <tr>
                                <th className="p-3 border border-gray-600">S No.</th>
                                <th className="p-3 border border-gray-600">Name</th>
                                <th className="p-3 border border-gray-600">Gender</th>
                                <th className="p-3 border border-gray-600">Branch</th>
                                <th className="p-3 border border-gray-600">House</th>
                                <th className="p-3 border border-gray-600">Mobile No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player._id} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                                    <td className="p-3 border border-gray-600 text-center">{index + 1}</td>
                                    <td className="p-3 border border-gray-600">{player.fullName}</td>
                                    <td className="p-3 border border-gray-600">{player.gender}</td>
                                    <td className="p-3 border border-gray-600">{player.branch}</td>
                                    <td className="p-3 border border-gray-600">{player.house}</td>
                                    <td className="p-3 border border-gray-600">{player.mobile}</td>
                                </tr>
                            ))}
                            {players.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-4 border text-center text-gray-400">
                                        No players found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default YourPlayer;