'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MatchFixture = () => {
    const [MatchFixture, setMatchFixture] = useState([]);
    const [formData, setFormData] = useState({
        matchNumber: "",
        gameName: "",
        house1: "",
        house2: "",
        date: "",
        gender: "",
    });
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchMatchFixture();
        }
    }, [session, status, router]);

    const fetchMatchFixture = async () => {
        try {
            const response = await axios.get(
                `/api/getAllMatchFixture`
            );
            setMatchFixture(response.data.matchFixtureDetails);
        } catch (error) {
            console.error("Error fetching match fixture:", error);
            toast.error("Failed to fetch match fixtures. Please try again.");
        }
    };

    const handleAddMatchFixture = async () => {
        try {
            await axios.post(
                "/api/createMatchFixture",
                formData
            );
            fetchMatchFixture();
            setFormData({
                matchNumber: "",
                gameName: "",
                house1: "",
                house2: "",
                date: "",
                gender: "",
            });
            toast.success("Match fixture added successfully!");
        } catch (error) {
            console.error("Error adding match fixture:", error);
            toast.error("Failed to add match fixture. Please try again.");
        }
    };

    const handleDeleteMatchFixture = async (matchFixtureId) => {
        try {
            await axios.post(
                `/api/deleteMatchFixture`,
                { matchNumber: matchFixtureId }
            );
            fetchMatchFixture();
            toast.success("Match fixture deleted successfully!");
        } catch (error) {
            console.error("Error deleting match fixture:", error);
            toast.error("Failed to delete match fixture. Please try again.");
        }
    };

    return (
        <div className="font-sans bg-gray-100 p-6">
            <ToastContainer />
            <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Match Fixture
                </h1>

                {/* Admin Form */}
                <div className="grid gap-6 max-w-2xl mx-auto">
                    <div className="flex gap-3 max-lg:flex-col">
                        <div className="form-group">
                            <label
                                htmlFor="matchNumber"
                                className="text-gray-700 font-medium"
                            >
                                Match Number:
                            </label>
                            <input
                                type="text"
                                id="matchNumber"
                                value={formData.matchNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, matchNumber: e.target.value })
                                }
                                placeholder="Enter Match Number"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="game" className="text-gray-700 font-medium">
                                Game Name:
                            </label>
                            <input
                                type="text"
                                id="game"
                                value={formData.gameName}
                                onChange={(e) =>
                                    setFormData({ ...formData, gameName: e.target.value })
                                }
                                placeholder="Enter Game Name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="house1" className="text-gray-700 font-medium">
                                House 1:
                            </label>
                            <input
                                type="text"
                                id="house1"
                                value={formData.house1}
                                onChange={(e) =>
                                    setFormData({ ...formData, house1: e.target.value })
                                }
                                placeholder="Enter House 1 Name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 max-lg:flex-col">
                        <div className="form-group">
                            <label htmlFor="house2" className="text-gray-700 font-medium">
                                House 2:
                            </label>
                            <input
                                type="text"
                                id="house2"
                                value={formData.house2}
                                onChange={(e) =>
                                    setFormData({ ...formData, house2: e.target.value })
                                }
                                placeholder="Enter House 2 Name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender" className="text-gray-700 font-medium">
                                Gender:
                            </label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={(e) =>
                                    setFormData({ ...formData, gender: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="boy">Boy</option>
                                <option value="girl">Girl</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date" className="text-gray-700 font-medium">
                                Date:
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAddMatchFixture}
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Add Match
                    </button>
                </div>

                {/* match Fixture Table */}
                <h2 className="text-xl font-semibold text-gray-800 mt-8 text-center">
                    Upcoming Matches
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full mt-6 border-collapse">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    Match Number
                                </th>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    Game Name
                                </th>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    House 1
                                </th>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    House 2
                                </th>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    Gender
                                </th>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    Date
                                </th>
                                <th className="px-4 py-2 text-gray-800 font-medium bg-blue-500 text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {MatchFixture.map((match, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2">{match.matchNumber}</td>
                                    <td className="px-4 py-2">{match.gameName}</td>
                                    <td className="px-4 py-2">{match.teams[0].house}</td>
                                    <td className="px-4 py-2">{match.teams[1].house}</td>
                                    <td className="px-4 py-2">{match.gender}</td>
                                    <td className="px-4 py-2">{match.date}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() =>
                                                handleDeleteMatchFixture(match.matchNumber)
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MatchFixture;
