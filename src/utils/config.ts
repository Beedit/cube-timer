"use client";

import { load } from "@tauri-apps/plugin-store";

const configHandler = await load("config.json", { autoSave: true });

export const config = {
    server: await configHandler.get("server"),
};
