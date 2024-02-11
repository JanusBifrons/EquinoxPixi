import { Weapon } from "@/game/objects/weapons/Weapon";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export interface IWeaponsProps {
    weapons: Weapon[];
}

export default function Weapons(props: IWeaponsProps) {
    const [selectedWeapons, setSelectedWeapons] = useState(0);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newSelection: number,
    ) => {
        setSelectedWeapons(newSelection);
    };

    return (
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-10">
            <div>
                <ToggleButtonGroup
                    color="primary"
                    value={selectedWeapons}
                    onChange={handleChange}
                    style={{ backgroundColor: 'white' }}
                >
                    {
                        props.weapons?.map((weapon, index) => {
                            return (
                                <ToggleButton value={index}>{weapon.name}</ToggleButton>
                            )
                        })
                    }
                </ToggleButtonGroup>
            </div>
        </div>
    )
}