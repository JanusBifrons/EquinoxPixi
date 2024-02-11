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
import { Weapon } from "@/game/objects/weapons/Weapon";

export interface UIProps {
    uiEvent: (e: UIEventArgs) => void;
    stats: Stats;
    weapons: Weapon[];
}

export default function UI(props: UIProps) {
    const [showMissions, setShowMissions] = useState(false);
    const [stats, setStats] = useState(props.stats);
    const [weapons, setWeapons] = useState(props.weapons);

    useEffect(() => {
        console.log(props.weapons);

        setStats(props.stats);
        setWeapons(props.weapons);
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
            <Weapons weapons={weapons}></Weapons>
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