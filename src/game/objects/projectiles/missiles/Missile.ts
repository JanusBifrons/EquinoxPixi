import { Bodies, Body, Vector } from "matter-js";
import { Projectile } from "../Projectile";
import { clamp, turnToFace, wrapAngle } from "@/components/Helpers";

export class Missile extends Projectile {
    ///
    /// PRIVATE 
    ///
    private _target: Body;
    private _maxRotationSpeed: number = 0.1;

    constructor(position: Vector, angle: number, speed: number, target: Body) {
        super(position);

        this._target = target;

        const body = Bodies.rectangle(0, 0, 100, 10);
        Body.setAngle(body, angle);
        body.isSensor = true;
        body.frictionAir = 1;

        this.setBody(body);

        let x: number = Math.cos(angle) * (50 + speed);
        let y: number = Math.sin(angle) * (50 + speed);

        // let x: number = Math.cos(angle);
        // let y: number = Math.sin(angle);

        Body.setVelocity(this.body, Vector.create(x, y));
    }

    public update(): void {
        const x = this._target.position.x - this.body.position.x;
        const y = this._target.position.y - this.body.position.y;

        const distance = Vector.magnitude(Vector.create(x, y));

        const desiredAngle = Math.atan2(y, x);

        const diffAngle = wrapAngle(desiredAngle - this.angle);

        const newAngle = clamp(diffAngle, -0.1, 0.1);

        Body.setAngle(this.body, this.angle + newAngle);

        let xVel: number = Math.cos(this.body.angle) * 1;
        let yVel: number = Math.sin(this.body.angle) * 1;

        console.log(this.body.speed);

        if (Math.abs(diffAngle) < 0.1) {
            Body.setVelocity(this.body, Vector.add(this.body.velocity, Vector.create(xVel, yVel)));
        }
    }
}
