import { Button, Description, FieldError, Form, Input, Label, ListBox, Modal, Select, Spinner, TextField, toast, type Key, type UseOverlayStateReturn } from "@heroui/react";
import { CogIcon } from "../icons/icons";
import data from "../../data/data.json";
import { useContext, useRef, useState } from "react";
import { CategoryData, SetCategoryData } from "../../utils/data";
import { newCategory } from "../../utils/api";
import { Status } from "../../utils/enums/Status";
import type { Category } from "../../utils/interfaces/Category";

export const AddCategoryModal = ({ modalState }: { modalState: UseOverlayStateReturn }) => {
    const categories = useContext(CategoryData);
    const updateCategories = useContext(SetCategoryData);
    const [category, setCategory] = useState<Key | null>("3x3");
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [proposedName, setProposedName] = useState("");
    const [isPending, setPending] = useState(false);

    const duplicateCategoryCheck = () => {
        let x = false;
        categories.forEach((category) => {
            if (category.categoryName == proposedName) {
                x = true;
            }
        });
        return x;
    };

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        const formData = new FormData(e.currentTarget);
        const fdata: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            fdata[key] = value.toString();
        });
        const comp = data.competitions.find(value => fdata["categoryType"] == value.name);
        if (comp) {
            const res = await newCategory(fdata["categoryName"], comp?.scrambleType, comp?.scrambleLength);

            if (res.status == Status.Success) {
                setPending(false);
                modalState.close();
                toast("New category created", { variant: "success" });
                updateCategories({
                    type: "add",
                    data: {
                        categoryName: fdata["categoryName"],
                        puzzleType: comp.scrambleType,
                        scrambleLength: comp.scrambleLength,
                    } as Category,
                });
                setProposedName("");
            } else {
                setPending(false);
                toast(`Unable to create new category due to ${res.result}`, { variant: "danger" });
            }
        } else {
            setPending(false);
            toast("Input error", { variant: "warning" });
        }
    };

    return (
        <Modal.Backdrop
            isOpen={modalState.isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) modalState.close();
            }}
        >
            <Modal.Container size="lg">
                <Modal.Dialog>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                        <Modal.Icon>
                            <CogIcon />
                        </Modal.Icon>
                        <Modal.Heading><b>New Category</b></Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="grid grid-cols-4 gap-2" onSubmit={submit}>
                            <Select
                                className="col-span-4"
                                variant="secondary"
                                defaultValue={category}
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                isRequired
                                name="categoryType"
                            >
                                <Label>Scramble Type</Label>
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Description />
                                <Select.Popover>
                                    <ListBox>
                                        {data.competitions.map(competition => (
                                            <ListBox.Item key={competition.name} id={competition.name} textValue={competition.name}>
                                                <Label>
                                                    {competition.name}
                                                </Label>
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                                <FieldError />
                            </Select>
                            <TextField
                                className="col-span-4"
                                name="categoryName"
                                isRequired
                                isInvalid={duplicateCategoryCheck()}
                                onChange={setProposedName}
                            >
                                <Label>Category Name</Label>
                                <Input placeholder="Category Name" ref={nameInputRef} />
                                {duplicateCategoryCheck()
                                    ? (
                                        <FieldError>Name cannot be the same as pre-existing category.</FieldError>
                                    )
                                    : (
                                        <Description>Choose a name for your category.</Description>
                                    )}
                            </TextField>
                            <Button fullWidth type="submit" className="col-span-2" isPending={isPending}>
                                {isPending ? <Spinner color="current" size="sm" /> : null}
                                Create Category
                            </Button>
                            <Button fullWidth type="reset" className="col-span-2" variant="danger-soft">
                                Reset
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    );
};
