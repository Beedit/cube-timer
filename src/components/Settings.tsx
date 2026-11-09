"use client";
import { useRef, useState } from "react";
import GlassBox from "./GlassBox";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import Modal from "react-modal";
import { data } from "../utils/data";
import { getSetting } from "../utils/config";

const customStyle = {
    overlay: {
        backgroundColor: "rgba(63, 63, 63, 0.83)",
    },
};

export default function Settings() {
    const [isOpen, setOpen] = useState(false);
    const [serverContent, setServerContent] = useState("");
    const server = useRef<HTMLInputElement>(null);

    const getSettings = async () => {
        const serverAddress = await getSetting("server");

        console.log(serverAddress);

        if (typeof serverAddress === "string") {
            setServerContent(serverAddress);
        }
    };

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
        data.changeSetting("server", server.current?.value ?? "https://localhost:5000");
    }

    return (
        <GlassBox>
            <button onClick={async () => {
                await getSettings();
                openModal();
            }}
            >
                <WhiteBox>
                    Open Settings
                </WhiteBox>
            </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} className="bg-transparent" style={customStyle} appElement={undefined}>
                <div className="h-full flex items-center justify-center">
                    <div className="w-9/10 p-4">
                        <WhiteBox>
                            <div className="p-4">
                                <button onClick={closeModal}>
                                    <WhiteBox>
                                        Close Settings
                                    </WhiteBox>
                                </button>
                                <br />
                                Server address:
                                <Input placeholderText="https://localhost:5000" ref={server} value={serverContent} />
                            </div>
                        </WhiteBox>
                    </div>
                </div>
            </Modal>
        </GlassBox>
    );
}
