import { Button } from "@mui/material";
import MacroControls from "./MacroControls";
import Weapons from "./Weapons";
import Account from "./Account";

export default function UI() {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0">
            <MacroControls></MacroControls>
            <Weapons></Weapons>
            <Account></Account>
        </div>
    );
}