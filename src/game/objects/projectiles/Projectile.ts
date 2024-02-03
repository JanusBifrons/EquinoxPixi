import { Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";

export class Projectile extends GameObject {
    constructor(position: Vector) {
        super(position, EGameObjectType.Projectile);
    }

    public update(): void {

    }
}