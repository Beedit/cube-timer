"use client";

const defaults = {
    server: "http://localhost:5000",
    lastCategory: "3x3x3",
    lastPuzzle: "333",
};

const getConfigHandler = async () => {
    if (typeof window === "undefined") throw Error("Window not defined");
    const tauriPluginStore = await import("@tauri-apps/plugin-store");
    return await tauriPluginStore.load("config.json", { autoSave: true, defaults: defaults });
};

export const updateSetting = async (key: string, value: string) => {
    const configHandler = await getConfigHandler();

    await configHandler.set(key, value);
    await configHandler.save();
};

export const getSetting = async (key: string) => {
    const configHandler = await getConfigHandler();

    return await configHandler.get(key);
};
