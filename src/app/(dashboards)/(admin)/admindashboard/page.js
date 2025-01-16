'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MatchFixture from "../MatchFixture/page";
import PlayerManagement from "../PlayerManagement/page";
import UserControll from "../UserControll/page";
import PointTable from "../PointTable/page";
import WinnerAndRunnerUpPage from "../WinnerAndRunnerUpPage/page";
import MatchFixturePlayers from "../MatchFixturePlayers/page";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("PlayerManagement");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const { data: session, status } = useSession();
    const router = useRouter()
  
    useEffect(() => {
      if (status === "loading") return; 
      if (!session || status === "unauthenticated") {
        router.push("/")
      }
    }, [router, session, status])

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            {/* Sidebar */}
            <div
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
                                onClick={() => setActiveTab("PlayerManagement")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "PlayerManagement"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                Player Management
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("UserControll")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "UserControll"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                User Controll
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setActiveTab("MatchFixture")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "MatchFixture"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                Match Fixture
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("PointTable")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "PointTable"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                Point Table
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("WinnerAndRunnerUpPage")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "WinnerAndRunnerUpPage"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                Winner And Runner-Up
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("MatchFixturePlayers")}
                                className={`block w-full text-left py-2 px-4 rounded-md ${activeTab === "MatchFixturePlayers"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                    }`}
                            >
                                Match Fixture Players
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
                {activeTab === "PlayerManagement" && <PlayerManagement />}
                {activeTab === "UserControll" && <UserControll />}
                {activeTab === "MatchFixture" && <MatchFixture />}
                {activeTab === "PointTable" && <PointTable />}
                {activeTab === "WinnerAndRunnerUpPage" && <WinnerAndRunnerUpPage />}
                {activeTab === "MatchFixturePlayers" && <MatchFixturePlayers />}
            </div>
        </div>
    );
};

export default AdminDashboard;
