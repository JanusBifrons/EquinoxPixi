import { Button } from "@mui/material";
import MacroControls from "./MacroControls";
import Weapons from "./Weapons";
import Account from "./Account";
import { EUIEventType, UIEventArgs } from "@/game/Args";
import ShipControls from "./ShipControls";
import ShipStats from "./ShipStats";
import { useEffect, useState } from "react";
import MissionsDialog from "./Dialogs/Missions/MissionsDialog";
import { Stats } from "@/game/objects/Stats";

export interface UIProps {
    uiEvent: (e: UIEventArgs) => void;
    stats: Stats;
}

export default function UI(props: UIProps) {
    const [showMissions, setShowMissions] = useState(false);
    const [stats, setStats] = useState(props.stats);

    useEffect(() => {
        setStats(props.stats);
    });

    return (
        <div className="absolute top-0 right-0 bottom-0 left-0">
            <MissionsDialog show={showMissions} onClose={() => { setShowMissions(false) }} />
            <ShipStats stats={stats}></ShipStats>
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
        </div>
    );
}