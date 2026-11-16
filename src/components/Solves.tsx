"use client";
import { useContext, useEffect, useState, type ReactNode } from "react";
import GlassBox from "./GlassBox";
import SolveTableRow from "./parts/SolveTableRow";
import { SolveListData, TimeData } from "../utils/data";
import { Table } from "@heroui/react";

export default function Solves() {
    const [children, setChildren] = useState<ReactNode[]>();
    const solveList = useContext(SolveListData);
    const currentTime = useContext(TimeData);

    useEffect(() => {
        const f = () => {
            const timesList: ReactNode[] = [];

            let c = 1;
            solveList.forEach((solve) => {
                if (solve.category == currentTime.category) {
                    timesList.push(<SolveTableRow solve={solve} key={solve.id} number={c} />);
                    c++;
                }
            });

            setChildren(timesList.reverse());
        };

        f();
    }, [currentTime.category, solveList]);

    return (
        <GlassBox>
            <div className="grid grid-cols-1 gap-2 justify-items-center">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Solves">
                            <Table.Header>
                                <Table.Column isRowHeader={true}>Number</Table.Column>
                                <Table.Column>Time</Table.Column>
                                <Table.Column></Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {children}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </GlassBox>
    );
}
