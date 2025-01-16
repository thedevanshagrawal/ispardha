'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const WinnerAndRunnerUpPage = () => {
    const [gameName, setGameName] = useState(""); // Store selected game name
    const [gameList, setGameList] = useState([]); // Store list of games
    const [winnerName, setWinnerName] = useState("");
    const [winnerHouse, setWinnerHouse] = useState("");
    const [runnerUpName, setRunnerUpName] = useState("");
    const [runnerUpHouse, setRunnerUpHouse] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [winnerAndRunnerUpList, setWinnerAndRunnerUpList] = useState([]);

    const { data: session, status } = useSession();
    const router = useRouter();

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
            const response = await axios.get(
                `/api/getAllGame`
            );
            setGameList(response.data.allGames); // Set game list
        } catch (error) {
            setErrorMessage("Failed to fetch games.");
        }
    };

    const getWinnerAndRunnerUp = async () => {
        try {
            const response = await axios.get(
                `/api/getWinnerAndRunnerUp`
            );
            setWinnerAndRunnerUpList(response.data.winnerDetails);
        } catch (error) {
            setErrorMessage("Failed to fetch games.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const data = {
            gameName: gameName,
            winnerName,
            winnerHouse,
            runnerUpName,
            runnerUpHouse,
        };

        try {
            const response = await axios.post(
                `/api/createWinnerAndRunnerUp`,
                data
            );

            getGameNames();
            getWinnerAndRunnerUp();
            toast.success("Winner and Runner-Up added successfully!");
        } catch (error) {
            setErrorMessage(error.response.data.message || "An error occurred");
        }
    };

    const handleDeletewinnerAndRunnerUp = async (gameName) => {
        await axios.post(
            `/api/deleteWinnerAndRunnerUp`,
            { gameName }
        );
        getGameNames();
        getWinnerAndRunnerUp();
        toast.success("Winner and Runner-Up Deleted successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <ToastContainer />
            <h2 className="text-2xl font-bold text-center mb-4">
                Enter Winner and Runner-Up Details
            </h2>


            <form onSubmit={handleSubmit}>
                <div className="mb-5 flex items-center justify-center gap-2 max-lg:flex-col max-lg:block">
                    <div className="max-lg:mb-4">
                        <label
                            htmlFor="gameName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Game Name
                        </label>
                        <select
                            id="gameName"
                            value={gameName || ""} // Set the value to the selected game name
                            onChange={(e) => {
                                setGameName(e.target.value);
                            }}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Match</option>
                            {gameList.map((game) => (
                                <option key={game.gameName} value={game.gameName}>
                                    {game}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="max-lg:mb-4">
                        <label
                            htmlFor="winnerName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Winner Name
                        </label>
                        <input
                            type="text"
                            id="winnerName"
                            value={winnerName}
                            onChange={(e) => setWinnerName(e.target.value)}
                            required
                            className="p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="max-lg:mb-4">
                        <label
                            htmlFor="winnerHouse"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Winner House
                        </label>

                        <select
                            name="winnerHouse"
                            value={winnerHouse}
                            onChange={(e) => setWinnerHouse(e.target.value)}
                            className="p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select House
                            </option>
                            <option value="Dominator">Dominator</option>
                            <option value="Terminator">Terminator</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>

                    <div className="max-lg:mb-4">
                        <label
                            htmlFor="runnerUpName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Runner-Up Name
                        </label>
                        <input
                            type="text"
                            id="runnerUpName"
                            value={runnerUpName}
                            onChange={(e) => setRunnerUpName(e.target.value)}
                            required
                            className="p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="max-lg:mb-4">
                        <label
                            htmlFor="runnerUpHouse"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Runner-Up House
                        </label>

                        <select
                            name="runnerUpHouse"
                            value={runnerUpHouse}
                            onChange={(e) => setRunnerUpHouse(e.target.value)}
                            className="p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select House
                            </option>
                            <option value="Dominator">Dominator</option>
                            <option value="Terminator">Terminator</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 p-2">S No.</th>
                            <th className="border border-gray-300 p-2">Game Name</th>
                            <th className="border border-gray-300 p-2">Winner Name</th>
                            <th className="border border-gray-300 p-2">Winner House</th>
                            <th className="border border-gray-300 p-2">Runner-Up Name</th>
                            <th className="border border-gray-300 p-2">Runner-Up House</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winnerAndRunnerUpList.map((player, index) => (
                            <tr key={player._id}>
                                <td className="border border-gray-300 p-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {player.gameName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {player.winnerName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {player.winnerHouse}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {player.runnerUpName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {player.runnerUpHouse}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() =>
                                            handleDeletewinnerAndRunnerUp(player.gameName)
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {winnerAndRunnerUpList.length === 0 && (
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
        </div>
    );
};

export default WinnerAndRunnerUpPage;
