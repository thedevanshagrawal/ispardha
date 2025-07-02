"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "@/utils/ThemeContext";
import { LogIn, User, Lock, Eye, EyeOff, User2 } from "lucide-react";
import Link from "next/link";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);
        if (result?.error) {
            alert(result.error);
        } else {
            const role = result?.user?.role;
            if (role === "admin") router.push("/admindashboard");
            else if (role === "captain" || role === "house-representative") router.push("/playerdashboard");
        }
    };

    useEffect(() => {
        if (session?.user) {
            const role = session.user.role;
            if (role === "admin") router.push("/admindashboard");
            else if (role === "captain" || role === "house-representative") router.push("/playerdashboard");
        }
    }, [session]);

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden ${isDarkMode ? "bg-gray-950" : "bg-white"}`}>
            {/* Glowing background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-br from-red-400/10 to-pink-500/10 rounded-full blur-2xl" />
            </div>

            <div className={`w-full max-w-md relative z-10 ${isDarkMode ? "bg-gray-950 border border-gray-700" : "bg-white/90 border border-gray-200"} rounded-3xl p-8 backdrop-blur-xl shadow-xl`}>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-lg">
                        <User2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                        i-Spardha
                    </h1>
                    <span className={`block text-sm mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {new Date().getFullYear()}
                    </span>
                    <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Welcome Back
                    </h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                <User className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            </div>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${isDarkMode
                                    ? "bg-gray-950 text-white border-gray-600 placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500/30"
                                    : "bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"}`}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                <Lock className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${isDarkMode
                                    ? "bg-gray-950 text-white border-gray-600 placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500/30"
                                    : "bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                                ) : (
                                    <Eye className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`group w-full py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed ${loading
                            ? "bg-gradient-to-r from-gray-500 to-gray-600"
                            : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                            } shadow-lg hover:shadow-xl`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
