"use client";
import { useRef, useState } from "react";
import GlassBox from "./GlassBox";
import { getSetting, updateSetting } from "../utils/config";
import CategoryDropdown from "./menus/CategoryDropdown";
import { Button, useOverlayState } from "@heroui/react";
import { SettingsModal } from "./menus/SettingsModal";
import { AboutModal } from "./menus/AboutModal";

export default function Settings() {
    const settingsModalState = useOverlayState({
        onOpenChange: (isOpen) => {
            if (!isOpen) {
                closeSettingsModal();
            }
        },
    });
    const aboutModalState = useOverlayState();
    const [serverContent, setServerContent] = useState("");
    const server = useRef<HTMLInputElement>(null);

    const getSettings = async () => {
        const serverAddress = await getSetting("server");

        if (typeof serverAddress === "string") {
            setServerContent(serverAddress);
        }
    };

    async function openSettingsModal() {
        await getSettings();
    }

    function closeSettingsModal() {
        updateSetting("server", server.current?.value ?? "https://localhost:5000");
    }

    return (
        <GlassBox>
            <div className="grid grid-cols-1 gap-2 justify-items-center">
                <CategoryDropdown />
                <Button
                    onClick={async () => {
                        await openSettingsModal();
                        settingsModalState.setOpen(true);
                    }}
                    fullWidth
                >
                    Settings
                </Button>
                <Button
                    onClick={async () => {
                        aboutModalState.setOpen(true);
                    }}
                    fullWidth
                >
                    About
                </Button>
            </div>
            <SettingsModal modalState={settingsModalState} server={server} serverContent={serverContent} />
            <AboutModal modalState={aboutModalState} />
        </GlassBox>
    );
}
