import { Modal } from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";

export const ManageCategoriesModal = ({ disclosure }: { disclosure: UseDisclosureReturn }) => {
    return (
        <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        {" "}
                        {/* Optional: Close button */}
                        <Modal.Header>
                            <Modal.Icon />
                            {" "}
                            {/* Optional: Icon */}
                            <Modal.Heading />
                        </Modal.Header>
                        <Modal.Body />
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
