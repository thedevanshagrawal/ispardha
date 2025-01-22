"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Matches = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [match, setMatch] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    } else {
      fetchMatchFixture();
    }
  }, [session, status, router]);

  const loggedInUserData = session?.user;

  const fetchMatchFixture = async () => {
    try {
      const response = await axios.get("/api/getMatchFixturePlayers");
      const filteredGames = response.data.matchResults.filter((game) =>
        game.players.some((player) => player.house === loggedInUserData.house)
      );
      setMatch(filteredGames); // Set only the games involving the logged-in user's house
    } catch (error) {
      console.error("Error fetching match fixtures:", error);
    }
  };

  const handleGameClick = (game) => {
    setSelectedGame(game.gameName);
    setPlayers(game.players);
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

              <strong className="text-lg font-medium">{game?.gameName}</strong>
            </div>
          ))
        ) : (
          <p>No games available for your house.</p>
        )}
      </div>

      {/* Show players of the selected game */}
      {selectedGame && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Players for {selectedGame}</h2>
          {players.length > 0 ? (
            <div className="">
              <table className="space-y-4 mt-4 w-[65%] border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Gender</th>
                    <th className="border border-gray-300 p-2">Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) =>
                    player.house === loggedInUserData.house ? (
                      <tr key={player._id}>
                        <td className="border border-gray-300 p-2">
                          {player.fullName}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {player.gender}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {player.branch}
                        </td>

                      </tr>

                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No players available for this game.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Matches;
