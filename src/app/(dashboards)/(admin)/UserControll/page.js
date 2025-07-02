'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from '@/utils/ThemeContext';

const UserControll = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        password: "",
        role: "",
        house: "",
    });
    const [editingusername, setEditingusername] = useState(null);

    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            fetchUsers();
        }
    }, [session, status, router]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/api/userDetails`);
            setUsers(response.data.userDetails);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post(`/api/register`, formData);
            setFormData({ fullName: "", username: "", password: "", role: "", house: "" });
            fetchUsers();
            toast.success("User Added", { position: "top-right", autoClose: 3000 });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleDeleteUser = async (username) => {
        try {
            await axios.post(`/api/deleteUser`, { username });
            fetchUsers();
            toast.success("User Deleted", { position: "top-right", autoClose: 3000 });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditUser = (user) => {
        setFormData({ username: user.username, fullName: user.fullName, role: user.role, house: user.house, password: "" });
        setEditingusername(user._id);
    };

    const handleUpdateUser = async () => {
        try {
            await axios.post(`/api/modifyUser`, formData);
            fetchUsers();
            setFormData({ fullName: "", username: "", password: "", role: "", house: "" });
            setEditingusername(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const inputStyle = `w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none transition-all duration-200 ${isDarkMode ? 'bg-gray-950 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`;
    const containerStyle = isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black';

    return (
        <div className={`min-h-screen ${containerStyle} p-6`}>
            <ToastContainer autoClose={3000} />
            <div className={`rounded-3xl shadow-2xl p-8 w-full max-w-5xl mx-auto border ${isDarkMode ? 'border-gray-700 bg-gray-950' : 'border-gray-300 bg-white'}`}>
                <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent tracking-wide">
                    User Access Control Panel
                </h1>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputStyle} placeholder="Enter Full Name" />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className={inputStyle} placeholder="Enter Username" />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={inputStyle} placeholder="Enter Password" />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Role</label>
                        <select name="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={inputStyle}>
                            <option value="">Select</option>
                            <option value="admin">Admin</option>
                            <option value="house-representative">House Representative</option>
                            <option value="Captain">Captain</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">House</label>
                        <select name="house" value={formData.house} onChange={(e) => setFormData({ ...formData, house: e.target.value })} className={inputStyle}>
                            <option value="">Select</option>
                            <option value="Dominators">Dominators</option>
                            <option value="Terminators">Terminators</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>
                </div>

                <button onClick={editingusername ? handleUpdateUser : handleAddUser} className="mt-6 w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300">
                    {editingusername ? "Update User" : "Add User"}
                </button>

                {/* Table */}
                <div className="overflow-x-auto mt-10">
                    <table className="w-full text-sm md:text-base border border-gray-600 ">
                        <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                            <tr>
                                <th className="p-3 border border-gray-600">Full Name</th>
                                <th className="p-3 border border-gray-600">Username</th>
                                <th className="p-3 border border-gray-600">Role</th>
                                <th className="p-3 border border-gray-600">House</th>
                                <th className="p-3 border border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={isDarkMode ? 'bg-gray-950' : 'bg-white'}>
                                    <td className="p-3 border border-gray-600 text-center">{user.fullName}</td>
                                    <td className="p-3 border border-gray-600 text-center">{user.username}</td>
                                    <td className="p-3 border border-gray-600 text-center">{user.role}</td>
                                    <td className="p-3 border border-gray-600 text-center">{user.house}</td>
                                    <td className="p-3 border border-gray-600 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-400 transition-all duration-200">Edit</button>
                                            <button onClick={() => handleDeleteUser(user.username)} className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition-all duration-200">Delete</button>
                                        </div>
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

export default UserControll;
