import { type UseOverlayStateReturn, Button, Input, Modal, TextArea, toast, ToggleButton } from "@heroui/react";
import { type Solve } from "../../utils/interfaces/Solve";
import { ThreeCubeIcon } from "../icons/icons";
import { formatTimer, getFormattedTime, SetSolveListData } from "../../utils/data";
import { setDnf, setNote, setPlusTwo, setScramble } from "../../utils/api";
import * as he from "he";
import { useContext, useRef } from "react";
import { Status } from "../../utils/enums/Status";

export const SolveMenu = ({ modalState, solve }: { modalState: UseOverlayStateReturn, solve: Solve }) => {
    const setSolveListData = useContext(SetSolveListData);
    const plusTwoInputRef = useRef<HTMLInputElement>(null);
    const scrambleInputRef = useRef<HTMLInputElement>(null);
    const noteInputRef = useRef<HTMLTextAreaElement>(null);

    const updateSolve = async (solve: Solve) => {
        const p2res = await setPlusTwo(solve.id, Number(plusTwoInputRef.current?.value));
        const nres = await setNote(solve.id, String(noteInputRef.current?.value));
        const sres = await setScramble(solve.id, String(scrambleInputRef.current?.value));
        if (p2res.status == Status.Success && nres.status == Status.Success && sres.status == Status.Success) {
            setSolveListData({
                type: "editSolve",
                data: {
                    id: solve.id,
                    data: {
                        plusTwo: Number(plusTwoInputRef.current?.value),
                        note: String(noteInputRef.current?.value),
                        scramble: String(scrambleInputRef.current?.value),
                    },
                },
            });
        } else {
            toast("Failed to save solve information. Please try again", { variant: "danger" });
        }
    };

    return (
        <Modal
            state={modalState}
            onOpenChange={(isOpen: boolean) => {
                if (!isOpen) {
                    updateSolve(solve);
                }
            }}
        >
            <Modal.Backdrop>
                <Modal.Container size="lg">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon>
                                <ThreeCubeIcon />
                            </Modal.Icon>
                            <Modal.Heading>
                                <b>
                                    {`Solve${(solve.id) ? " " + solve.id : ""}: ${getFormattedTime(solve)} on ${new Date(solve.date).toLocaleDateString()}`}
                                </b>
                                <br />
                                {`Real Time: ${formatTimer(solve.time)}`}
                                <br />
                                {((solve.plusTwo > 0) ? `+${solve.plusTwo} * 2 seconds` : "")}
                                <br />
                                {(solve.dnf) ? "DNF" : ""}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="grid grid-cols-3 gap-3">
                            <Input fullWidth className="col-span-full" defaultValue={he.decode(solve.scramble)} variant="secondary" ref={scrambleInputRef}>
                            </Input>
                            <Input type="number" min={0} max={9} fullWidth ref={plusTwoInputRef} defaultValue={solve.plusTwo} variant="secondary">
                            </Input>
                            <ToggleButton
                                defaultSelected={solve.dnf}
                                onPress={() => {
                                    setSolveListData({
                                        type: "editSolve",
                                        data: {
                                            id: solve.id,
                                            data: {
                                                dnf: !solve.dnf,
                                            },
                                        },
                                    });
                                    setDnf(solve.id, !solve.dnf);
                                }}
                                className="w-full"
                            >
                                Set DNF
                            </ToggleButton>
                            <Button
                                fullWidth
                                variant="danger"
                                onPress={() => {
                                    setSolveListData({
                                        type: "remove",
                                        data: solve,
                                    });
                                    modalState.close();
                                }}
                            >
                                Delete
                            </Button>
                            <TextArea defaultValue={solve.note} className="col-span-full" variant="secondary" ref={noteInputRef} />
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
