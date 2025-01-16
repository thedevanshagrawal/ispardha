'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MatchFixturePlayers = () => {
    const [match, setMatch] = useState([]); // Holds all match data
    const [selectedGame, setSelectedGame] = useState(null); // Holds the selected game
    const [players, setPlayers] = useState([]); // Holds the players for the selected game

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchMatch();
        }
    }, [session, status, router]);

    const fetchMatch = async () => {
        try {
            const response = await axios.get("/api/getMatchFixturePlayers");
            setMatch(response.data.matchResults); // Assuming the response has matchResults data
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const handleGameClick = (game) => {
        setSelectedGame(game.gameName); // Set selected game name
        setPlayers(game.players); // Set players of the selected game
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Match Fixture Players</h1>

            {/* Display list of games */}
            <div className="space-y-4">
                {match.length > 0 ? (
                    match.map((game, index) => (
                        <div
                            key={index}
                            onClick={() => handleGameClick(game)}
                            className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                        >
                            <strong className="text-lg">{game.gameName}</strong>
                        </div>
                    ))
                ) : (
                    <p>No games available.</p>
                )}
            </div>

            {/* Show players of the selected game */}
            {selectedGame && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Players for {selectedGame}</h2>
                    {players.length > 0 ? (
                        <ul className="space-y-4 mt-4">
                            {players.map((player, index) => (
                                <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
                                    <p><strong>Name:</strong> {player.fullName}</p>
                                    <p><strong>House:</strong> {player.house}</p>
                                    {/* You can add more player details here */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No players available for this game.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchFixturePlayers;
