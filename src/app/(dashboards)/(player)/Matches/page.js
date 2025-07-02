"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/utils/ThemeContext';

const Matches = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isDarkMode } = useTheme();

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
      setMatch(filteredGames);
    } catch (error) {
      console.error("Error fetching match fixtures:", error);
    }
  };

  const handleGameClick = (game) => {
    setSelectedGame(game.gameName);
    setPlayers(game.players);
  };

  const containerStyle = isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black';
  const cardStyle = isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300';

  return (
    <div className={`min-h-screen p-6 ${containerStyle}`}>
      <div className={`max-w-4xl mx-auto border rounded-3xl shadow-xl p-6 ${cardStyle}`}>
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
          Match Fixture Players
        </h1>

        {/* Games List */}
        <div className="space-y-4">
          {match.length > 0 ? (
            match.map((game, index) => (
              <div
                key={index}
                onClick={() => handleGameClick(game)}
                className="cursor-pointer p-4 border rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-r from-red-100 to-orange-100 text-black"
              >
                <strong className="text-lg font-semibold">{game?.gameName}</strong>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No games available for your house.</p>
          )}
        </div>

        {/* Player Table */}
        {selectedGame && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Players for {selectedGame}
            </h2>
            {players.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-600 rounded-xl overflow-hidden text-sm md:text-base">
                  <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                    <tr>
                      <th className="p-3 border text-center">Name</th>
                      <th className="p-3 border text-center">Gender</th>
                      <th className="p-3 border text-center">Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player) =>
                      player.house === loggedInUserData.house ? (
                        <tr key={player._id} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                          <td className="p-3 border text-center">{player.fullName}</td>
                          <td className="p-3 border text-center">{player.gender}</td>
                          <td className="p-3 border text-center">{player.branch}</td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-400">No players available for this game.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;