'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/utils/ThemeContext';

const MatchFixture = () => {
    const [MatchFixture, setMatchFixture] = useState([]);
    const [formData, setFormData] = useState({
        matchNumber: "",
        gameName: "",
        house1: "",
        house2: "",
        matchTime: "",
        date: "",
        gender: "",
    });
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/");
        else fetchMatchFixture();
    }, [session, status, router]);

    const fetchMatchFixture = async () => {
        try {
            const response = await axios.get(`/api/getAllMatchFixture`);
            setMatchFixture(response.data.matchFixtureDetails);
        } catch (error) {
            toast.error("Failed to fetch match fixtures. Please try again.");
        }
    };

    const handleAddMatchFixture = async () => {
        try {
            await axios.post("/api/createMatchFixture", formData);
            fetchMatchFixture();
            setFormData({ matchNumber: "", gameName: "", house1: "", house2: "", matchTime: "", date: "", gender: "" });
            toast.success("Match fixture added successfully!");
        } catch (error) {
            toast.error("Failed to add match fixture. Please try again.");
        }
    };

    const handleDeleteMatchFixture = async (matchFixtureId) => {
        try {
            await axios.post(`/api/deleteMatchFixture`, { matchNumber: matchFixtureId });
            fetchMatchFixture();
            toast.success("Match fixture deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete match fixture. Please try again.");
        }
    };

    const inputStyle = `w-full p-3 border rounded-lg shadow-sm focus:outline-none transition-all duration-200 ${isDarkMode ? 'bg-gray-900 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`;

    return (
        <div className={`${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
            <ToastContainer />
            <div className={`max-w-5xl mx-auto p-8 rounded-3xl shadow-2xl border ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}>
                <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-wide">
                    Match Fixture Scheduling
                </h1>

                {/* Form */}
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input type="text" placeholder="Match Number" value={formData.matchNumber} onChange={(e) => setFormData({ ...formData, matchNumber: e.target.value })} className={inputStyle} required />
                        <input type="text" placeholder="Game Name" value={formData.gameName} onChange={(e) => setFormData({ ...formData, gameName: e.target.value })} className={inputStyle} required />
                        <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className={inputStyle}>
                            <option value="">Select Gender</option>
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <select value={formData.house1} onChange={(e) => setFormData({ ...formData, house1: e.target.value })} className={inputStyle}>
                            <option value="">Select House 1</option>
                            <option value="Dominators">Dominators</option>
                            <option value="Terminators">Terminators</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                        <select value={formData.house2} onChange={(e) => setFormData({ ...formData, house2: e.target.value })} className={inputStyle}>
                            <option value="">Select House 2</option>
                            <option value="Dominators">Dominators</option>
                            <option value="Terminators">Terminators</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="time" value={formData.matchTime} onChange={(e) => setFormData({ ...formData, matchTime: e.target.value })} className={inputStyle} required />
                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputStyle} required />
                    </div>

                    <button onClick={handleAddMatchFixture} className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300">
                        Add Match
                    </button>
                </div>

                {/* Table */}
                <h2 className="text-2xl font-semibold text-center mt-10 mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Upcoming Matches
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm md:text-base border border-gray-600 rounded-xl overflow-hidden">
                        <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                            <tr>
                                <th className="p-3 border">Match No.</th>
                                <th className="p-3 border">Game</th>
                                <th className="p-3 border">House 1</th>
                                <th className="p-3 border">House 2</th>
                                <th className="p-3 border">Gender</th>
                                <th className="p-3 border">Time</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MatchFixture.map((match, index) => (
                                <tr key={index} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                                    <td className="p-3 border text-center">{match.matchNumber}</td>
                                    <td className="p-3 border text-center">{match.gameName}</td>
                                    <td className="p-3 border text-center">{match.teams[0].house}</td>
                                    <td className="p-3 border text-center">{match.teams[1].house}</td>
                                    <td className="p-3 border text-center">{match.gender}</td>
                                    <td className="p-3 border text-center">{match.matchTime}</td>
                                    <td className="p-3 border text-center">{match.date}</td>
                                    <td className="p-3 border text-center">
                                        <button onClick={() => handleDeleteMatchFixture(match.matchNumber)} className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition-all duration-200">
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
