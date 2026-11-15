import { Table, TableBody } from "@heroui/react";
import { type ReactNode } from "react";
import type { Category } from "../../utils/interfaces/Category";
import CategoryRow from "./CategoryRow";

export default function CategoryTable() {
    const categories: Category[] = [];
    const nodes: ReactNode[] = [];

    const f = async () => {
        categories.forEach((category) => {
            nodes.push(<CategoryRow category={category as Category} key={category.categoryName} />);
        });
    };

    f();
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
                        {nodes}
                    </TableBody>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}
