import { Dropdown, Label } from "@heroui/react";
import { data } from "../utils/data";
import { useState, type ReactNode } from "react";

export default function CategoryDropdown() {
    const [children, setChildren] = useState<ReactNode[]>();

    const f = async () => {
        const children: ReactNode[] = [];
        const categories = await data.getCategories();

        categories.forEach((category) => {
            children.push(
                <Dropdown.Item key={category.categoryName}>
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
                Categories
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <Dropdown.Menu>
                    {children}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
}
