'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
            await axios.post(
                `/api/register`,
                formData);

            setFormData({
                fullName: "",
                username: "",
                password: "",
                role: "",
                house: "",
            });
            fetchUsers();
            toast.success("User Added", {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleDeleteUser = async (username) => {
        try {
            await axios.post(
                `/api/deleteUser`,
                { username }
            );
            fetchUsers();
            toast.success("User Deleted", {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
            });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditUser = (user) => {
        setFormData({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            house: user.house,
            password: "",
        });
        setEditingusername(user._id); // Set the user being edited
    };

    const handleUpdateUser = async () => {
        try {
            await axios.post(
                `/api/modifyUser`,
                formData
            );
            fetchUsers();
            setFormData({
                fullName: "",
                username: "",
                password: "",
                role: "",
                house: "",
            });
            setEditingusername(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <ToastContainer autoClose={3000} />

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center md:text-left">
                    User Access Management
                </h1>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({ ...formData, username: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter Username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter Password"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="select">Select</option>
                            <option value="admin">Admin</option>
                            <option value="house-representative">House Representative</option>
                            <option value="Captain">Captain</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">House</label>
                        <select
                            name="house"
                            value={formData.house}
                            onChange={(e) =>
                                setFormData({ ...formData, house: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="select">Select</option>
                            <option value="Dominators">Dominators</option>
                            <option value="Terminators">Terminators</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Challengers">Challengers</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={editingusername ? handleUpdateUser : handleAddUser}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {editingusername ? "Update User" : "Add User"}
                </button>

                {/* Table */}
                <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse text-sm md:text-base">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="p-2 border">Full Name</th>
                                <th className="p-2 border">Username</th>
                                <th className="p-2 border">Role</th>
                                <th className="p-2 border">House</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="p-2 border">{user.fullName}</td>
                                    <td className="p-2 border">{user.username}</td>
                                    <td className="p-2 border">{user.role}</td>
                                    <td className="p-2 border">{user.house}</td>
                                    <td className="p-2 border flex justify-around">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.username)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
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
