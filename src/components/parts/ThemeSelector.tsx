"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { updateSetting } from "../../utils/config";

export function ThemeSelector() {
    const { setTheme, theme } = useTheme();

    const setNewTheme = (theme: string) => {
        setTheme(theme);
        updateSetting("theme", theme);
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant={theme === "light" ? "primary" : "secondary"}
                onPress={() => setNewTheme("light")}
            >
                Light
            </Button>
            <Button
                variant={theme === "dark" ? "primary" : "secondary"}
                onPress={() => setNewTheme("dark")}
            >
                Dark
            </Button>
            <Button
                variant={theme === "system" ? "primary" : "secondary"}
                onPress={() => setNewTheme("system")}
            >
                System
            </Button>
        </div>
    );
}
