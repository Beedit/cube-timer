import { type UseOverlayStateReturn, Button, Input, Modal, TextArea, ToggleButton } from "@heroui/react";
import type { Solve } from "../../utils/interfaces/Solve";
import { ThreeCubeIcon } from "../icons/icons";
import { formatTimer } from "../../utils/data";
import { deleteSolve, setDnf } from "../../utils/api";
import * as he from "he";

export const SolveMenu = ({ modalState, solve }: { modalState: UseOverlayStateReturn, solve: Solve }) => {
    return (
        <Modal state={modalState}>
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon>
                                <ThreeCubeIcon />
                            </Modal.Icon>
                            <Modal.Heading>
                                {`Solve${(solve.id) ? " " + solve.id : ""}: ${formatTimer(solve.time)} on ${new Date(solve.date).toLocaleDateString()}`}
                                <br />
                                {`Time: ${formatTimer(solve.time)}`}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="grid grid-cols-4 gap-3">
                            <Input fullWidth className="col-span-full" defaultValue={he.decode(solve.scramble)}>
                            </Input>
                            <Input type="number" fullWidth>
                            </Input>
                            <Button fullWidth>
                                Set Plus Two
                            </Button>
                            <ToggleButton defaultSelected={solve.dnf} onPress={() => setDnf(solve.id, !solve.dnf)} className="w-full">
                                Set DNF
                            </ToggleButton>
                            <Button
                                fullWidth
                                variant="danger"
                                onPress={() => {
                                    deleteSolve(solve.id);
                                    modalState.close();
                                }}
                            >
                                Delete
                            </Button>
                            <TextArea defaultValue={solve.note} className="col-span-full" />
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
