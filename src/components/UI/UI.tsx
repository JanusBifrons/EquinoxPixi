import { Button } from "@mui/material";
import MacroControls from "./MacroControls";
import Weapons from "./Weapons";
import Account from "./Account";
import { EUIEventType, UIEventArgs } from "@/game/Args";
import ShipControls from "./ShipControls";
import ShipStats from "./ShipStats";
import { useState } from "react";
import MissionsDialog from "./Dialogs/Missions/MissionsDialog";

export interface UIProps {
    uiEvent: (e: UIEventArgs) => void;
}

export default function UI(props: UIProps) {
    const [showMissions, setShowMissions] = useState(true);

    return (
        <div className="absolute top-0 right-0 bottom-0 left-0">
            <MissionsDialog show={showMissions} onClose={() => { setShowMissions(false) }} />
            <MacroControls
                action={(e) => {
                    props.uiEvent(e);

                    switch (e.type) {
                        case EUIEventType.Missions:
                            setShowMissions(true);
                            break;
                    }
                }}
            />
            <Weapons></Weapons>
            <Account></Account>
            {/* <SectorItems></SectorItems> */}
            <ShipControls
                action={(e) => {
                    switch (e.type) {
                        case EUIEventType.ToggleInteralDampening:
                            break;
                    }

                    props.uiEvent(e);
                }}
            />
            <ShipStats></ShipStats>
        </div>
    );
}