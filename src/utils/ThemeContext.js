// "use client"
// import React, { createContext, useState, useContext, useEffect } from 'react';

// // Create the ThemeContext
// const ThemeContext = createContext({
//     isDarkMode: false,
//     toggleTheme: () => { },
// });

// // Theme Provider Component
// export const ThemeProvider = ({ children }) => {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // Load theme preference from localStorage on initial load
//     useEffect(() => {
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme === 'dark') {
//             setIsDarkMode(true);
//             document.documentElement.classList.add('dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//         }
//     }, []);

//     // Toggle theme function
//     const toggleTheme = () => {
//         const newTheme = !isDarkMode;
//         setIsDarkMode(newTheme);

//         // Update localStorage
//         localStorage.setItem('theme', newTheme ? 'dark' : 'light');

//         // Add/remove dark class to html element
//         if (newTheme) {
//             document.documentElement.classList.add('dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//         }
//     };

//     return (
//         <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// // Custom hook to use theme context
// export const useTheme = () => useContext(ThemeContext);


// ☝️☝️ for dark and light theme mode

// 👇👇 for dark theme only


"use client";
import React, { createContext, useContext, useEffect } from "react";

// Context always returns dark mode
const ThemeContext = createContext({
    isDarkMode: true,
    toggleTheme: () => { }, // no-op to prevent crashes if used
});

// ThemeProvider for dark mode only
export const ThemeProvider = ({ children }) => {
    useEffect(() => {
        // Force dark mode by adding the 'dark' class
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme: () => { } }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
