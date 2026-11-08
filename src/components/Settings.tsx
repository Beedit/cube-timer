import GlassBox from "./GlassBox";
import Input from "./Input";

export default function Settings() {
    return (
        <GlassBox>
            <GlassBox>
                Server address:
                <Input placeholderText="https://localhost:5000" />
            </GlassBox>
        </GlassBox>
    );
}
