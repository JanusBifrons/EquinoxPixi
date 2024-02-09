import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export default function Weapons() {
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
                    color="error"
                    exclusive
                    value={selectedWeapons}
                    onChange={handleChange}
                    style={{ backgroundColor: 'white' }}
                >
                    <ToggleButton value={0}>Weapon Set One</ToggleButton>
                    <ToggleButton value={1}>Weapon Set Two</ToggleButton>
                    <ToggleButton value={2}>Weapon Set Three</ToggleButton>
                </ToggleButtonGroup>
            </div>

        </div>
    )
}