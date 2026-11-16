"use client";
import { Button, Table, useOverlayState } from "@heroui/react";
import { SolveMenu } from "../menus/SolveMenu";
import { type Solve } from "../../utils/interfaces/Solve";
import { EditIcon } from "../icons/icons";
import { getFormattedTime } from "../../utils/data";

export default function SolveTableRow({ solve, number }: { solve: Solve, number: number }) {
    const modalState = useOverlayState();
    return (
        <>
            <Table.Row>
                <Table.Cell>{number}</Table.Cell>
                <Table.Cell>{getFormattedTime(solve)}</Table.Cell>
                <Table.Cell>
                    <Button onPress={() => {
                        modalState.setOpen(true);
                    }}
                    >
                        <EditIcon />
                    </Button>
                    <SolveMenu modalState={modalState} solve={solve} />
                </Table.Cell>
            </Table.Row>
        </>
    );
}
