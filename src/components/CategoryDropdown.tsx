import { Dropdown, Label } from "@heroui/react";
import { CurrentContext } from "../utils/data";
import { useContext, useState, type ReactNode } from "react";
import WhiteBox from "./WhiteBox";

export default function CategoryDropdown() {
    const context = useContext(CurrentContext);
    const [children, setChildren] = useState<ReactNode[]>();

    const f = async () => {
        const children: ReactNode[] = [];
        const categories = await context.getCategories();

        categories.forEach((category) => {
            children.push(
                <Dropdown.Item key={category.categoryName} onAction={() => context.changeCategory(category.categoryName, category.puzzleType)}>
                    <Label>
                        {category.categoryName}
                    </Label>
                </Dropdown.Item>,
            );
        });

        setChildren(children);
    };

    return (
        <Dropdown onOpenChange={(open) => {
            if (open) {
                f();
            }
        }}
        >
            <Dropdown.Trigger>
                <WhiteBox>
                    Categories
                </WhiteBox>
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    {children}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}
