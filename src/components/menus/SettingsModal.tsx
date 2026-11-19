import { Input, Label, Modal, type UseOverlayStateReturn } from "@heroui/react";
import { CogIcon } from "../icons/icons";
import type { RefObject } from "react";
import DefaultCategoryDropdown from "../parts/DefaultCategoryDropdown";
import { ThemeSelector } from "../parts/ThemeSelector";

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
                            <Modal.Heading><b>Settings</b></Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="grid grid-cols-1 gap-3">
                                <Label isRequired={true}>Server URL</Label>
                                <Input placeholder="https://localhost:5000" ref={server} defaultValue={serverContent} variant="secondary" />
                                <Label>Default Category</Label>
                                <DefaultCategoryDropdown />
                                <Label>Theme</Label>
                                <ThemeSelector />
                            </div>
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
