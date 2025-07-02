"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    Menu,
    LayoutDashboard,
    LogOut,
    Users,
    UserCog,
    CalendarRange,
    BarChart3,
    Award,
    UsersRound,
    KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PlayerManagement from "../PlayerManagement/page";
import UserControll from "../UserControll/page";
import MatchFixture from "../MatchFixture/page";
import PointTable from "../PointTable/page";
import WinnerAndRunnerUpPage from "../WinnerAndRunnerUpPage/page";
import { useTheme } from "@/utils/ThemeContext";
import MatchFixturePlayers from "@/components/MatchFixturePlayers";
import ChangePassword from "@/components/ChangePassword";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("PlayerManagement");
    const [mounted, setMounted] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDarkMode } = useTheme();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (status === "loading") return;
        if (!session || status === "unauthenticated") {
            router.push("/");
        }
    }, [status, session, router]);

    if (!mounted || status === "loading") {
        return (
            <div className={`h-screen w-full flex items-center justify-center ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}>
                <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-red-500 animate-spin" />
            </div>
        );
    }

    const handleTabChange = (value) => setActiveTab(value);

    const navButtonStyle = (tab) =>
        `w-full justify-start text-base cursor-pointer transition-all duration-300 ${activeTab === tab
            ? isDarkMode ? "bg-white text-gray-900 font-semibold" : "bg-black text-white font-semibold"
            : isDarkMode ? "text-white hover:bg-white hover:text-gray-900" : "text-black hover:bg-black hover:text-white"}`;

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <header className={`sticky top-0 z-50 flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-gray-700 bg-gray-950' : 'border-gray-300 bg-white'}`}>
                <div className="flex items-center gap-4">
                    {/* Mobile Sidebar */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className={`${isDarkMode ? 'text-white' : 'text-black'} md:hidden`}>
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className={`${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} p-0`}>
                            <div className="h-full flex flex-col">
                                <div className="p-6 border-b border-gray-700">
                                    <p className="font-semibold">{session?.user?.name || "User"}</p>
                                    <p className="text-sm text-gray-400">{session?.user?.email}</p>
                                </div>
                                <nav className="flex-1 p-4 space-y-2">
                                    <Button className={navButtonStyle("PlayerManagement")} onClick={() => handleTabChange("PlayerManagement")}>
                                        <Users className="mr-2 h-4 w-4" /> Player Management
                                    </Button>

                                    <Button className={navButtonStyle("UserControll")} onClick={() => handleTabChange("UserControll")}>
                                        <UserCog className="mr-2 h-4 w-4" /> User Control
                                    </Button>

                                    <Button className={navButtonStyle("MatchFixture")} onClick={() => handleTabChange("MatchFixture")}>
                                        <CalendarRange className="mr-2 h-4 w-4" /> Match Fixture
                                    </Button>

                                    <Button className={navButtonStyle("PointTable")} onClick={() => handleTabChange("PointTable")}>
                                        <BarChart3 className="mr-2 h-4 w-4" /> Point Table
                                    </Button>

                                    <Button className={navButtonStyle("WinnerAndRunnerUpPage")} onClick={() => handleTabChange("WinnerAndRunnerUpPage")}>
                                        <Award className="mr-2 h-4 w-4" /> Winner & Runner-Up
                                    </Button>

                                    <Button className={navButtonStyle("MatchFixturePlayers")} onClick={() => handleTabChange("MatchFixturePlayers")}>
                                        <UsersRound className="mr-2 h-4 w-4" /> Match Fixture Players
                                    </Button>

                                    <Button className={navButtonStyle("changepassword")} onClick={() => handleTabChange("changepassword")}>
                                        <KeyRound className="mr-2 h-4 w-4" /> Change Password
                                    </Button>
                                </nav>
                                <div className="p-4 border-t border-gray-700">
                                    <Button
                                        variant="outline"
                                        className={`w-full cursor-pointer justify-start ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} hover:opacity-80`}
                                        onClick={() => signOut()}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="h-5 w-5" />
                        Welcome – {session?.user?.name || "User"}
                    </h1>
                </div>

                {/* Desktop Sign Out */}
                <div className="hidden md:block">
                    <Button
                        variant="outline"
                        className={`w-full cursor-pointer justify-start ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} hover:opacity-80`}
                        onClick={() => signOut()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <nav className={`hidden md:flex flex-col w-64 border-r ${isDarkMode ? 'border-gray-700 bg-gray-950' : 'border-gray-300 bg-white'} p-4 space-y-2`}>
                    <Button className={navButtonStyle("PlayerManagement")} onClick={() => handleTabChange("PlayerManagement")}>
                        <Users className="mr-2 h-4 w-4" /> Player Management
                    </Button>

                    <Button className={navButtonStyle("UserControll")} onClick={() => handleTabChange("UserControll")}>
                        <UserCog className="mr-2 h-4 w-4" /> User Control
                    </Button>

                    <Button className={navButtonStyle("MatchFixture")} onClick={() => handleTabChange("MatchFixture")}>
                        <CalendarRange className="mr-2 h-4 w-4" /> Match Fixture
                    </Button>

                    <Button className={navButtonStyle("PointTable")} onClick={() => handleTabChange("PointTable")}>
                        <BarChart3 className="mr-2 h-4 w-4" /> Point Table
                    </Button>

                    <Button className={navButtonStyle("WinnerAndRunnerUpPage")} onClick={() => handleTabChange("WinnerAndRunnerUpPage")}>
                        <Award className="mr-2 h-4 w-4" /> Winner & Runner-Up
                    </Button>

                    <Button className={navButtonStyle("MatchFixturePlayers")} onClick={() => handleTabChange("MatchFixturePlayers")}>
                        <UsersRound className="mr-2 h-4 w-4" /> Match Fixture Players
                    </Button>

                    <Button className={navButtonStyle("changepassword")} onClick={() => handleTabChange("changepassword")}>
                        <KeyRound className="mr-2 h-4 w-4" /> Change Password
                    </Button>

                </nav>

                {/* Page Content */}
                <main className="flex-1 mt-4 mb-8 p-4 md:p-6 overflow-y-auto">
                    {activeTab === "PlayerManagement" && <PlayerManagement darkMode={isDarkMode} />}
                    {activeTab === "UserControll" && <UserControll darkMode={isDarkMode} />}
                    {activeTab === "MatchFixture" && <MatchFixture darkMode={isDarkMode} />}
                    {activeTab === "PointTable" && <PointTable darkMode={isDarkMode} />}
                    {activeTab === "WinnerAndRunnerUpPage" && <WinnerAndRunnerUpPage darkMode={isDarkMode} />}
                    {activeTab === "MatchFixturePlayers" && <MatchFixturePlayers darkMode={isDarkMode} />}
                    {activeTab === "changepassword" && <ChangePassword darkMode={isDarkMode} />}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
