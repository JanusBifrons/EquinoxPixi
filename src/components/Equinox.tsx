'use client'

import { hasValue } from "@/app/util";
import { Game } from "@/game/Game";
import React, { ReactNode, RefObject, useCallback, useEffect, useMemo, useState } from "react";
import UI from "./UI/UI";
import { IUIUpdateEventArgs, UIEventArgs } from "@/game/Args";
import ShipStats from "./UI/ShipStats";
import Account from "./UI/Account";
import Weapons from "./UI/Weapons";
import MacroControls from "./UI/MacroControls";
import MissionsDialog from "./UI/Dialogs/Missions/MissionsDialog";
import ShipControls from "./UI/ShipControls";
import { Stats } from "@/game/objects/Stats";
import { Weapon } from "@/game/objects/weapons/Weapon";


export default function Equinoix() {
    const [stats, setStats] = useState<Stats>();
    const [weapons, setWeapons] = useState<Weapon[]>();
    const [stateBust, setStateBust] = useState(0);

    const game = new Game();
    //const canvas = React.createRef<HTMLCanvasElement>();

    const updateUI = (sender, args: IUIUpdateEventArgs) => {
        setStats(args.stats);
        setWeapons(args.weapons);
        setStateBust(Math.random());

        //console.log(hullPercent);

        // console.log("argument sent");
        // console.log(args.stats?.shieldPercent);
        // console.log(stats?.shieldPercent);
    }


    game.updateUI.addHandler(updateUI);


    const onRefChange = useCallback(node => {
        if (node === null) {
            // DOM node referenced by ref has been unmounted
        } else {
            // DOM node referenced by ref has changed and exists
            game.setCanvas(node as HTMLCanvasElement);
        }
    }, []); // adjust deps

    return (
        <div className="relative">
            <canvas ref={onRefChange} className="flex" />
            <UI
                uiEvent={(e: UIEventArgs) => {
                    game.onUIEvent(e);
                }}
                stats={stats}
                weapons={weapons}
            />
        </div>
    )
}