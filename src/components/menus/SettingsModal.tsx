import { Input, Modal, type UseOverlayStateReturn } from "@heroui/react";
import { CogIcon } from "../icons/icons";
import type { RefObject } from "react";

export const SettingsModal = ({ modalState, server, serverContent }: { modalState: UseOverlayStateReturn, server: RefObject<HTMLInputElement | null>, serverContent: string }) => {
    return (
        <Modal state={modalState}>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon>
                                <CogIcon />
                            </Modal.Icon>
                            <Modal.Heading>Settings</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <Input placeholder="https://localhost:5000" ref={server} defaultValue={serverContent}></Input>
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
