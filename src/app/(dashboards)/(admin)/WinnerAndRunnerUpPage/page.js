"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/utils/ThemeContext";

const WinnerAndRunnerUpPage = () => {
  const [gameName, setGameName] = useState("");
  const [gameList, setGameList] = useState([]);
  const [winnerName, setWinnerName] = useState("");
  const [winnerHouse, setWinnerHouse] = useState("");
  const [runnerUpName, setRunnerUpName] = useState("");
  const [runnerUpHouse, setRunnerUpHouse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [winnerAndRunnerUpList, setWinnerAndRunnerUpList] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    } else {
      getGameNames();
      getWinnerAndRunnerUp();
    }
  }, [session, status, router]);

  const getGameNames = async () => {
    try {
      const response = await axios.get(`/api/getAllGame`);
      setGameList(response.data.allGames);
    } catch (error) {
      setErrorMessage("Failed to fetch games.");
    }
  };

  const getWinnerAndRunnerUp = async () => {
    try {
      const response = await axios.get(`/api/getWinnerAndRunnerUp`);
      setWinnerAndRunnerUpList(response.data.winnerDetails);
    } catch (error) {
      setErrorMessage("Failed to fetch winner and runner-up.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const data = {
      gameName,
      winnerName,
      winnerHouse,
      runnerUpName,
      runnerUpHouse,
    };

    try {
      await axios.post(`/api/createWinnerAndRunnerUp`, data);
      getGameNames();
      getWinnerAndRunnerUp();
      toast.success("Winner and Runner-Up added successfully!");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeletewinnerAndRunnerUp = async (gameName) => {
    try {
      await axios.post(`/api/deleteWinnerAndRunnerUp`, { gameName });
      getGameNames();
      getWinnerAndRunnerUp();
      toast.success("Winner and Runner-Up deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete entry.");
    }
  };

  const inputStyle = `p-2 w-full border rounded-md ${isDarkMode ? 'bg-gray-900 text-white border-gray-600 placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'}`;

  return (
    <div className={`${isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"} min-h-screen py-8`}>
      <ToastContainer />
      <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
          Winner and Runner-Up Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Game Name</label>
              <select value={gameName} onChange={(e) => setGameName(e.target.value)} className={inputStyle}>
                <option value="">Select Match</option>
                {gameList.map((game) => (
                  <option key={game.gameName} value={game.gameName}>{game}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Winner Name</label>
              <input type="text" value={winnerName} onChange={(e) => setWinnerName(e.target.value)} required className={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Winner House</label>
              <select value={winnerHouse} onChange={(e) => setWinnerHouse(e.target.value)} required className={inputStyle}>
                <option value="">Select House</option>
                <option value="Dominators">Dominators</option>
                <option value="Terminators">Terminators</option>
                <option value="Avengers">Avengers</option>
                <option value="Challengers">Challengers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Runner-Up Name</label>
              <input type="text" value={runnerUpName} onChange={(e) => setRunnerUpName(e.target.value)} required className={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Runner-Up House</label>
              <select value={runnerUpHouse} onChange={(e) => setRunnerUpHouse(e.target.value)} required className={inputStyle}>
                <option value="">Select House</option>
                <option value="Dominators">Dominators</option>
                <option value="Terminators">Terminators</option>
                <option value="Avengers">Avengers</option>
                <option value="Challengers">Challengers</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-md">
            Submit
          </button>
        </form>

        <div className="overflow-x-auto mt-10">
          <table className="w-full text-sm border-collapse border border-gray-600">
            <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
              <tr>
                <th className="p-2 border border-gray-600">S No.</th>
                <th className="p-2 border border-gray-600">Game Name</th>
                <th className="p-2 border border-gray-600">Winner Name</th>
                <th className="p-2 border border-gray-600">Winner House</th>
                <th className="p-2 border border-gray-600">Runner-Up Name</th>
                <th className="p-2 border border-gray-600">Runner-Up House</th>
                <th className="p-2 border border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {winnerAndRunnerUpList.map((player, index) => (
                <tr key={player._id} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                  <td className="p-2 border border-gray-600 text-center">{index + 1}</td>
                  <td className="p-2 border border-gray-600">{player.gameName}</td>
                  <td className="p-2 border border-gray-600">{player.winnerName}</td>
                  <td className="p-2 border border-gray-600">{player.winnerHouse}</td>
                  <td className="p-2 border border-gray-600">{player.runnerUpName}</td>
                  <td className="p-2 border border-gray-600">{player.runnerUpHouse}</td>
                  <td className="p-2 border border-gray-600 text-center">
                    <button onClick={() => handleDeletewinnerAndRunnerUp(player.gameName)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {winnerAndRunnerUpList.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-2 border border-gray-600 text-center text-gray-400">
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

export default WinnerAndRunnerUpPage;
