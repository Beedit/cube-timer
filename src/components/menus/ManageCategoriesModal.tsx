import { Button, Modal, useOverlayState, type UseOverlayStateReturn } from "@heroui/react";
import { CogIcon } from "../icons/icons";
import CategoryTable from "../parts/CategoryTable";
import { AddCategoryModal } from "./AddCategoryModal";

export const ManageCategoriesModal = ({ modalState }: { modalState: UseOverlayStateReturn }) => {
    const newCategoryModalState = useOverlayState({});

    return (
        <Modal.Backdrop
            isOpen={modalState.isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) modalState.close();
            }}
        >
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
                            <Button onPress={newCategoryModalState.open}>
                                New Category
                            </Button>
                            <AddCategoryModal modalState={newCategoryModalState} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    );
};
