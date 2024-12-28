"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type ColorScheme = {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

const defaultColorSchemes: ColorScheme[] = [
    {
        name: "Krishna Blue",
        primary: "#0089c1",
        secondary: "#3982c3",
        accent: "#ffffff",
        background: "#ffffff",
        text: "#000000"
    },
    {
        name: "Dark Krishna",
        primary: "#0089c1",
        secondary: "#3982c3",
        accent: "#ffffff",
        background: "#000000",
        text: "#ffffff"
    }
]

interface ThemeContextType {
    colorScheme: ColorScheme
    setColorScheme: (colorScheme: ColorScheme) => void
    colorSchemes: ColorScheme[]
    addColorScheme: (newScheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorSchemes[0])
    const [colorSchemes, setColorSchemes] = useState<ColorScheme[]>(defaultColorSchemes)

    useEffect(() => {
        document.documentElement.style.setProperty('--primary', colorScheme.primary)
        document.documentElement.style.setProperty('--secondary', colorScheme.secondary)
        document.documentElement.style.setProperty('--accent', colorScheme.accent)
        document.documentElement.style.setProperty('--background', colorScheme.background)
        document.documentElement.style.setProperty('--text', colorScheme.text)
    }, [colorScheme])

    const addColorScheme = (newScheme: ColorScheme) => {
        setColorSchemes([...colorSchemes, newScheme])
    }

    return (
        <ThemeContext.Provider value={{ colorScheme, setColorScheme, colorSchemes, addColorScheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

