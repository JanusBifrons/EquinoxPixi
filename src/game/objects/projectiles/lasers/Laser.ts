import { Bodies, Body, ICollisionFilter, Vector } from "matter-js";
import { GameObject } from "../../GameObject";
import { EGameObjectType } from "../../GameObjectTypes";
import { Projectile } from "../Projectile";

export class Laser extends Projectile {
    constructor(position: Vector, angle: number, speed: number) {
        super(position);

        const body = Bodies.rectangle(0, 0, 100, 10);
        Body.setAngle(body, angle);
        body.isSensor = true;

        this.setBody(body);

        let x: number = Math.cos(angle) * (50 + speed);
        let y: number = Math.sin(angle) * (50 + speed);

        Body.setVelocity(this.body, Vector.create(x, y));

        this.body.label = "Laser";
    }
}