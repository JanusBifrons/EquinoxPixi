import { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";

export class Projectile extends GameObject {
    constructor(position: Vector) {
        super(position, EGameObjectType.Projectile);
    }

    public update(): void {
        super.update();
    }

    public setBody(parts: Body[]): void {
        super.setBody(parts, true);
    }
}