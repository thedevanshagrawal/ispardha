'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const YourPlayer = () => {
    const [players, setPlayers] = useState([])
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchPlayers()
        }
    }, [session, status, router]);

    const fetchPlayers = async () => {
        try {
            const response = await axios.post("/api/getPlayersByHouseName", {
                userDataId: session.user.id
            });
            setPlayers(response.data.playerData);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border border-gray-300 p-2">S No.</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Branch</th>
                        <th className="border border-gray-300 p-2">House</th>
                        <th className="border border-gray-300 p-2">Mobile No.</th>
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
                                {player.branch}
                            </td>
                            <td className="border border-gray-300 p-2">{player.house}</td>
                            <td className="border border-gray-300 p-2">
                                {player.mobile}
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
    )
}

export default YourPlayer
