'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/');
        }
    }, [session, status, router]);

    const updatePassword = async (e) => {
        e.preventDefault();

        // Basic validation
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <form
                className="w-full max-w-md p-6 bg-white rounded shadow-md"
                onSubmit={updatePassword}
            >
                <h2 className="mb-4 text-xl font-semibold text-center">Change Password</h2>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block mb-1 font-medium">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="w-full px-4 py-2 border rounded"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block mb-1 font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
