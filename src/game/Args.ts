import { Stats } from "./objects/Stats";
import { Projectile } from "./objects/projectiles/Projectile";
import { Weapon } from "./objects/weapons/Weapon";

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
    weapons: Weapon[];
}