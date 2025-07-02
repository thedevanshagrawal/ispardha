'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useTheme } from '@/utils/ThemeContext';

const PlayerManagement = () => {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        branch: '',
        house: '',
        mobile: '',
        gender: '',
    });
    const [houseFilter, setHouseFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [editingPlayerId, setEditingPlayerId] = useState(null);
    const [file, setFile] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const [debouncedHouseFilter] = useDebounce(houseFilter, 500);
    const [debouncedGenderFilter] = useDebounce(genderFilter, 500);

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/');
        } else {
            fetchPlayers();
        }
    }, [session, status, router]);

    useEffect(() => {
        if (debouncedHouseFilter || debouncedGenderFilter) {
            fetchPlayers();
        }
    }, [debouncedHouseFilter, debouncedGenderFilter]);

    const fetchPlayers = async () => {
        try {
            let url = `/api/getAllPlayers`;
            if (debouncedHouseFilter || debouncedGenderFilter) {
                url += `?house=${debouncedHouseFilter}&gender=${debouncedGenderFilter}`;
            }
            const response = await axios.get(url);
            setPlayers(response.data.playerData);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddPlayer = async () => {
        try {
            await axios.post(`/api/createPlayer`, formData);
            fetchPlayers();
            setFormData({
                fullName: '',
                branch: '',
                house: '',
                mobile: '',
                gender: '',
            });
            toast.success('Player Added Successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleBulkUpload = async () => {
        if (!file) {
            toast.error('Please select a file to upload.');
            return;
        }

        const playerBulkData = new FormData();
        playerBulkData.append('file', file);

        try {
            await axios.post(`/api/bulkCreatePlayers`, playerBulkData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchPlayers();
            toast.success('Player Added Successfully');
        } catch (error) {
            toast.error('Failed to upload players.');
        }
    };

    const handleUpdatePlayer = async () => {
        try {
            await axios.post(`/api/updatePlayer`, formData);
            fetchPlayers();
            setFormData({
                fullName: '',
                branch: '',
                house: '',
                mobile: '',
                gender: '',
            });
            setEditingPlayerId(null);
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };

    const handleEdit = (player) => {
        setFormData({
            fullName: player.fullName,
            branch: player.branch,
            house: player.house,
            mobile: player.mobile,
            gender: player.gender,
        });
        setEditingPlayerId(player._id);
    };

    const deletePlayer = async (playerId) => {
        try {
            const res = await axios.post('/api/deletePlayer', { playerId });
            fetchPlayers();
            toast.success('Player deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete player.');
        }
    };

    const inputStyle = `p-2 border-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode
            ? 'bg-gray-950 text-white border-gray-600 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/30'
            : 'bg-white text-black border-gray-300 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20'
        }`;

    const buttonStyle = `bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded transition-all duration-300`;

    return (
        <div className={`${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} min-h-screen`}>
            <ToastContainer />
            <main
                className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-300'
                    } shadow-xl rounded-2xl mt-10 p-8`}
            >
                <h2 className="text-center text-3xl font-black mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Player Management
                </h2>

                {/* Filters */}
                <div className="flex justify-start items-center gap-5 mb-6">
                    <select value={houseFilter} onChange={(e) => setHouseFilter(e.target.value)} className={inputStyle}>
                        <option value="">All Houses</option>
                        <option value="Dominators">Dominators</option>
                        <option value="Terminators">Terminators</option>
                        <option value="Avengers">Avengers</option>
                        <option value="Challengers">Challengers</option>
                    </select>
                    <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className={inputStyle}>
                        <option value="">Select Gender</option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                    </select>
                </div>

                {/* Form */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <input type="text" name="fullName" placeholder="Player Name" value={formData.fullName} onChange={handleChange} className={inputStyle} />
                    <select name="gender" value={formData.gender} onChange={handleChange} className={inputStyle}>
                        <option value="" disabled>Select Gender</option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                    </select>
                    <select name="branch" value={formData.branch} onChange={handleChange} className={inputStyle}>
                        <option value="" disabled>Select Branch</option>
                        <option value="B.TECH">B.TECH</option>
                        <option value="B.COM">B.COM</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                        <option value="BA">BA</option>
                        <option value="LLB">LLB</option>
                        <option value="B.ED">B.ED</option>
                        <option value="BSC">BSC</option>
                        <option value="MA">MA</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                    </select>
                    <select name="house" value={formData.house} onChange={handleChange} className={inputStyle}>
                        <option value="" disabled>Select House</option>
                        <option value="Dominators">Dominators</option>
                        <option value="Terminators">Terminators</option>
                        <option value="Avengers">Avengers</option>
                        <option value="Challengers">Challengers</option>
                    </select>
                    <input type="text" name="mobile" placeholder="Mobile No." value={formData.mobile} onChange={handleChange} maxLength="10" className={inputStyle} />
                    <button onClick={editingPlayerId ? handleUpdatePlayer : handleAddPlayer} className={`${buttonStyle} w-full md:w-auto`}>
                        {editingPlayerId ? 'Update Player' : 'Add Player'}
                    </button>
                </div>

                {/* Bulk Upload */}
                <div className="mb-6 flex items-center gap-4 max-lg:flex-col">
                    <input type="file" onChange={handleFileChange} accept=".csv,.xlsx,.xls,.json" className={inputStyle + ' max-lg:w-[90%]'} />
                    <button onClick={handleBulkUpload} className={`${buttonStyle} max-lg:w-[60%] max-lg:text-[12px]`}>
                        Upload Player Details
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                        <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                            <tr>
                                <th className="border border-gray-600 p-2">S No.</th>
                                <th className="border border-gray-600 p-2">Name</th>
                                <th className="border border-gray-600 p-2">Gender</th>
                                <th className="border border-gray-600 p-2">Branch</th>
                                <th className="border border-gray-600 p-2">House</th>
                                <th className="border border-gray-600 p-2">Mobile No.</th>
                                <th className="border border-gray-600 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player._id} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                                    <td className="border border-gray-600 p-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-600 p-2">{player.fullName}</td>
                                    <td className="border border-gray-600 p-2">{player.gender}</td>
                                    <td className="border border-gray-600 p-2">{player.branch}</td>
                                    <td className="border border-gray-600 p-2">{player.house}</td>
                                    <td className="border border-gray-600 p-2">{player.mobile}</td>
                                    <td className="border border-gray-600 p-2 text-center">
                                        <button onClick={() => deletePlayer(player._id)} className="bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {players.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="border border-gray-600 p-2 text-center text-gray-400">No players found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default PlayerManagement;
