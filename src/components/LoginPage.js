"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();  // Use session hook to check session state
    const router = useRouter();

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
            if (result?.user?.role) {
                switch (result.user.role) {
                    case "admin":
                        navigate("/admindashboard");
                        break;
                    case "captain":
                        navigate("/playerdashboard");
                        break;
                    case "house-representative":
                        navigate("/playerdashboard");
                        break;
                }
            } else {

            }
        }
    };

    useEffect(() => {
        if (session?.user) {

            if (session.user.role === "admin") {
                router.push("/admindashboard");
            } else if (session.user.role === "captain" || session.user.role === "house-representative") {
                router.push("/playerdashboard");
            }
        }
    }, [session, router]);

    return (
        <div className="bg-[url('/login-banner.jpg')] bg-cover min-h-screen flex  justify-center items-center px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-700 mb-6 sm:mb-5">
                    i-Spardha {new Date().getFullYear()}
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-700 mb-6 sm:mb-7">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
