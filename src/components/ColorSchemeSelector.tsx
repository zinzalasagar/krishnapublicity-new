import { useTheme } from "next-themes"

export const ColorSchemeSelector = () => {
    const { theme, setTheme } = useTheme()

    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "Light" : "Dark"}</button>
    )
}

