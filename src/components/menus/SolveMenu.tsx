import { type UseOverlayStateReturn, Button, Input, Modal, TextArea, ToggleButton } from "@heroui/react";
import { type Solve } from "../../utils/interfaces/Solve";
import { ThreeCubeIcon } from "../icons/icons";
import { formatTimer, getFormattedTime, SetSolveListData } from "../../utils/data";
import { setDnf, setPlusTwo } from "../../utils/api";
import * as he from "he";
import { useContext, useRef } from "react";

export const SolveMenu = ({ modalState, solve }: { modalState: UseOverlayStateReturn, solve: Solve }) => {
    const setSolveListData = useContext(SetSolveListData);
    const plusTwoInputRef = useRef<HTMLInputElement>(null);

    const setPlusTwoLocal = (solve: Solve) => {
        setPlusTwo(solve.id, Number(plusTwoInputRef.current?.value));
        setSolveListData({
            type: "editSolve",
            data: {
                id: solve.id,
                data: {
                    plusTwo: Number(plusTwoInputRef.current?.value),
                },
            },
        });
    };

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
                        <Modal.Body className="grid grid-cols-4 gap-3">
                            <Input fullWidth className="col-span-full" defaultValue={he.decode(solve.scramble)}>
                            </Input>
                            <Input type="number" min={0} max={9} fullWidth ref={plusTwoInputRef} defaultValue={solve.plusTwo}>
                            </Input>
                            <Button
                                fullWidth
                                onPress={() => setPlusTwoLocal(solve)}
                            >
                                Set Plus Two
                            </Button>
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
                            <TextArea defaultValue={solve.note} className="col-span-full" />
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
