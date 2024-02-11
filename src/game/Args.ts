import { Stats } from "./objects/Stats";
import { Projectile } from "./objects/projectiles/Projectile";

export interface IFiredEventArgs {
    projectiles: Projectile[];
}

export interface UIEventArgs {
    type: EUIEventType;
    value?: any;
}

export enum EUIEventType {
    Default,
    ToggleInteralDampening,
    Missions
}

export interface IUIUpdateEventArgs {
    stats: Stats;
}