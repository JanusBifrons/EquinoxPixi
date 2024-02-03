import { Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";
import { Projectile } from "../projectiles/Projectile";

export abstract class Weapon extends GameObject {
    constructor(position: Vector) {
        super(position, EGameObjectType.Weapon);


    }

    public abstract fire(): Projectile[];
}