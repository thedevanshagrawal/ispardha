'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@/utils/ThemeContext';

const ChangePassword = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) router.push('/');
    }, [session, status, router]);

    const updatePassword = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match.');
            return;
        }

        try {
            const response = await axios.post('/api/userDataUpdate', {
                userDataId: session.user.id,
                oldPassword,
                newPassword,
            });

            if (response.data.success) {
                toast.success('Password updated successfully!');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(response.data.message || 'Failed to update password.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    const containerStyle = isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black';
    const cardStyle = isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300';
    const inputStyle = `w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-gray-500'}`;

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${containerStyle}`}>
            <ToastContainer autoClose={3000} />
            <form
                onSubmit={updatePassword}
                className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border ${cardStyle}`}
            >
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                    Change Password
                </h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="oldPassword" className="block mb-1 font-semibold">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            className={inputStyle}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block mb-1 font-semibold">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className={inputStyle}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1 font-semibold">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={inputStyle}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
