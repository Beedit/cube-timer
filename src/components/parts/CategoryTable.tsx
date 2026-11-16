import { Table, TableBody } from "@heroui/react";
import { useContext, useEffect, useState, type ReactNode } from "react";
import type { Category } from "../../utils/interfaces/Category";
import CategoryRow from "./CategoryRow";
import { CategoryData } from "../../utils/data";

export default function CategoryTable() {
    const [children, setChildren] = useState<ReactNode[]>();
    const categories = useContext(CategoryData);
    useEffect(() => {
        const f = () => {
            const nodes: ReactNode[] = [];

            categories.forEach((category) => {
                nodes.push(<CategoryRow category={category as Category} key={category.categoryName} />);
            });

            setChildren(nodes);
        };

        f();
    }, [categories]);

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content>
                    <Table.Header>
                        <Table.Column isRowHeader>Categories</Table.Column>
                        <Table.Column>Scramble Type (cstimer)</Table.Column>
                        <Table.Column>Scramble Length</Table.Column>
                        <Table.Column></Table.Column>
                    </Table.Header>
                    <TableBody>
                        {children}
                    </TableBody>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}
