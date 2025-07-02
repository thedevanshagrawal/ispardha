"use client"
import HomePage from "@/components/HomePage";
import { useTheme } from "@/utils/ThemeContext";

export default function Home() {
   const { isDarkMode } = useTheme();

  return (
   <div className={`${isDarkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <HomePage/>
    </div>
  );
}
