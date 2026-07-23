import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
    darkMode: boolean;
    alternarTema: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("tema") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } 
        else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("tema", darkMode ? "dark" : "light");
    }, [darkMode]);

    function alternarTema() {
        setDarkMode((prev) => !prev);
    }
    return (
        <ThemeContext.Provider value={{ darkMode, alternarTema }}>{children}</ThemeContext.Provider>
    );
}


export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme precisa estar dentro do ThemeProvider");
    }
    return context;
}