import { Modal, type UseOverlayStateReturn } from "@heroui/react";
import { CogIcon } from "../icons/icons";
import CategoryTable from "../parts/CategoryTable";

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
                            <Modal.Heading><b>Manage Categories</b></Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="grid grid-cols-1 gap-3">
                                <CategoryTable />
                            </div>
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
