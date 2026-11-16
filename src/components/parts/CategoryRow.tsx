import { Button, Table } from "@heroui/react";
import type { Category } from "../../utils/interfaces/Category";
import { BinIcon } from "../icons/icons";
import { useContext } from "react";
import { SetCategoryData } from "../../app/providers";

const CategoryRow = ({ category }: { category: Category }) => {
    const updateCategory = useContext(SetCategoryData);
    const onClick = (category: Category) => {
        updateCategory({
            type: "remove",
            data: category.categoryName,
        });
    };

    return (
        <Table.Row key={category.categoryName}>
            <Table.Cell>{category.categoryName}</Table.Cell>
            <Table.Cell>{category.puzzleType}</Table.Cell>
            <Table.Cell>{category.scrambleLength}</Table.Cell>
            <Table.Cell>
                <Button variant="danger-soft" onClick={() => onClick(category)}>
                    <BinIcon />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};

export default CategoryRow;
