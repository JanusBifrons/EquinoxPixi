import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import RocketIcon from '@mui/icons-material/Rocket';
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import RuleIcon from '@mui/icons-material/Rule';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import { EUIEventType, UIEventArgs } from "@/game/Args";

const actions = [
    { icon: <RocketIcon />, name: 'Ship' },
    { icon: <Diversity3SharpIcon />, name: 'Crew' },
    { icon: <RuleIcon />, name: 'Missions' },
    { icon: <LocationOnSharpIcon />, name: 'Map' },
];

export interface IMacroControlsProps {
    action: (e: UIEventArgs) => void;
}

export default function MacroControls(props: IMacroControlsProps) {
    return (
        <div className="absolute bottom-0 right-0 p-10">
            <div className="flex flex-col gap-5">
                <SpeedDial
                    ariaLabel="action"
                    icon={<SpeedDialIcon />}
                >
                    {actions.reverse().map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => {
                                props.action({
                                    type: EUIEventType.Default
                                } as UIEventArgs);
                            }}
                        />
                    ))}
                </SpeedDial>
            </div>

        </div>
    );
}