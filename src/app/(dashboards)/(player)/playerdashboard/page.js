'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AddPlayersToFixture from "../AddPlayersToFixture/page";
import ShowPointTable from "../ShowPointTable/page";
import Players from "../YourPlayer/page";
import Matches from "../Matches/page";
import ChangePassword from "../ChangePassword/page";

const PlayerDashboard = () => {
    const [activeTab, setActiveTab] = useState("addPlayer");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session || status === "unauthenticated") {
            router.push("/");
        }
    }, [router, session, status]);

    // Close sidebar automatically after 2 seconds when it opens
    useEffect(() => {
        if (isSidebarOpen) {
            const timer = setTimeout(() => {
                setIsSidebarOpen(false);
            }, 3000);

            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [isSidebarOpen]);

    // Close sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="flex flex-col sm:flex-row h-screen">
            {/* Sidebar */}
            <div
            ref={sidebarRef}
                className={`fixed sm:relative z-50 w-64 bg-gray-800 text-white flex flex-col transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } sm:translate-x-0`}
            >
                <div className="p-6 text-lg font-bold border-b border-gray-700 flex justify-between items-center sm:block">

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="sm:hidden text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2 p-4">
                        <li>
                            <button
                                onClick={() => setActiveTab("addPlayer")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "addPlayer" ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}
                            >
                                Add Player
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("showPointTable")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "showPointTable" ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}
                            >
                                Point Table
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("Players")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "Players" ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}
                            >
                                Players
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("Matches")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "Matches" ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}
                            >
                                Matches
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("ChangePassword")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "ChangePassword" ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}
                            >
                                Change Password
                            </button>
                        </li>

                    </ul>
                </nav>
            </div>

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="sm:hidden  mt-16 fixed top-4 left-2 z-50 p-2 bg-gray-800 text-white rounded-md"
            >
                ☰
            </button>

            {/* Main Content */}
            <div className="flex-grow bg-gray-100 p-6 overflow-auto sm:ml-50">
                {activeTab === "addPlayer" && <AddPlayersToFixture />}
                {activeTab === "showPointTable" && <ShowPointTable />}
                {activeTab === "Players" && <Players />}
                {activeTab === "Matches" && <Matches />}
                {activeTab === "ChangePassword" && <ChangePassword />}
            </div>
        </div>
    );
};

export default PlayerDashboard;
