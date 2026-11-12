"use client";
import { useContext, useRef, useState } from "react";
import GlassBox from "./GlassBox";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import Modal from "react-modal";
import { getSetting } from "../utils/config";
import CategoryDropdown from "./CategoryDropdown";
import { CurrentContext } from "../utils/data";

const customStyle = {
    overlay: {
        backgroundColor: "rgba(63, 63, 63, 0.83)",
    },
};

export default function Settings() {
    const context = useContext(CurrentContext);
    const [isOpen, setOpen] = useState(false);
    const [serverContent, setServerContent] = useState("");
    const server = useRef<HTMLInputElement>(null);

    const getSettings = async () => {
        const serverAddress = await getSetting("server");
        const lmao = await context.getCategories();

        console.log(lmao);

        if (typeof serverAddress === "string") {
            setServerContent(serverAddress);
        }
    };

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
        context.changeSetting("server", server.current?.value ?? "https://localhost:5000");
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
            <br />
            <CategoryDropdown />

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
