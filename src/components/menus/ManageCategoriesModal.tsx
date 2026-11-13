import { Modal, type UseOverlayStateReturn } from "@heroui/react";
import { CogIcon } from "../icons/icons";

export const ManageCategoriesModal = ({ disclosure }: { disclosure: UseOverlayStateReturn }) => {
    return (
        <Modal state={disclosure}>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon>
                                <CogIcon />
                            </Modal.Icon>
                            <Modal.Heading>Manage Categories</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body />
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
