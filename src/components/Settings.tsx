"use client";
import { useRef, useState } from "react";
import GlassBox from "./GlassBox";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import Modal from "react-modal";
import { getSetting, updateSetting } from "../utils/config";
import CategoryDropdown from "./CategoryDropdown";
// import { CurrentContext } from "../utils/data";

const customStyle = {
    overlay: {
        backgroundColor: "rgba(63, 63, 63, 0.83)",
    },
};

export default function Settings() {
    // const context = useContext(CurrentContext);
    const [isOpen, setOpen] = useState(false);
    const [serverContent, setServerContent] = useState("");
    const server = useRef<HTMLInputElement>(null);

    const getSettings = async () => {
        const serverAddress = await getSetting("server");

        if (typeof serverAddress === "string") {
            setServerContent(serverAddress);
        }
    };

    async function openModal() {
        getSettings();
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
        updateSetting("server", server.current?.value ?? "https://localhost:5000");
    }

    return (
        <GlassBox>
            <div className="grid grid-cols-1 gap-2 justify-items-center">
                <button onClick={async () => {
                    await openModal();
                }}
                >
                    <WhiteBox>
                        Open Settings
                    </WhiteBox>
                </button>
                <br />
                <CategoryDropdown />
            </div>
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
