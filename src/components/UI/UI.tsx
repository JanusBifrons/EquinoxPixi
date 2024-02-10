import { Button } from "@mui/material";
import MacroControls from "./MacroControls";
import Weapons from "./Weapons";
import Account from "./Account";
import SectorItems from "./SectorItems";
import { Event } from "../Event";
import { UIEventArgs } from "@/game/Args";
import ShipControls from "./ShipControls";
import ShipStats from "./ShipStats";

export interface UIProps {
    uiEvent: (e: UIEventArgs) => void;
}

export default function UI(props: UIProps) {
    return (
        <div className="absolute top-0 right-0 bottom-0 left-0">
            <MacroControls action={(e) => { props.uiEvent(e); }}></MacroControls>
            <Weapons></Weapons>
            <Account></Account>
            {/* <SectorItems></SectorItems> */}
            <ShipControls action={(e) => { props.uiEvent(e); }}></ShipControls>
            <ShipStats></ShipStats>
        </div>
    );
}