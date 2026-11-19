"use client";
const tauriPluginStore = await import("@tauri-apps/plugin-store");
import type { Category } from "./interfaces/Category";
import data from "../data/data.json";

const getConfigHandler = async () => {
    if (typeof window === "undefined") return;
    return await tauriPluginStore.load("config.json", { autoSave: true, defaults: data.config.defaults });
};

export const updateSetting = async (key: string, value: string | Category) => {
    const configHandler = await getConfigHandler();

    if (configHandler) {
        await configHandler.set(key, value);
        await configHandler.save();
    }
};

export const getSetting = async (key: string) => {
    const configHandler = await getConfigHandler();

    if (configHandler) {
        return await configHandler.get(key);
    }
    return;
};
