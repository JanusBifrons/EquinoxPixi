import { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";

export abstract class Projectile extends GameObject {

    constructor(position: Vector) {
        super(position, EGameObjectType.Projectile);
    }

    public setBody(parts: Body[]): void {
        super.setBody(parts, true);
    }

    public abstract get damage(): number;
    public abstract get drain(): number;
}