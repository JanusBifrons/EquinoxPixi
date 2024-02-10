import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MouseEvent, useState } from "react";
import MultipleStopSharpIcon from '@mui/icons-material/MultipleStopSharp';
import { EUIEventType, UIEventArgs } from "@/game/Args";

export interface IShipControlsProps {
    action: (e: UIEventArgs) => void;
}

export default function ShipControls(props: IShipControlsProps) {
    const [selected, setSelected] = useState([]);

    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newSelections: string[],
    ) => {
        setSelected(newSelections);
    };

    return (
        <div className="absolute bottom-0 left-0 flex justify-center p-10">
            <ToggleButtonGroup
                value={selected}
                color="primary"
                onChange={handleFormat}
                aria-label=""
                style={{ backgroundColor: 'white' }}
            >
                <ToggleButton value="interialDampening" aria-label="" size="large" color="primary" onClick={() => {
                    props.action({
                        type: EUIEventType.ToggleInteralDampening,
                        value: selected.indexOf("interialDampening") != -1
                    });
                }}>
                    <MultipleStopSharpIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>

    );
}