import { Body, Vector } from "matter-js";
import { Weapon } from "../Weapon";
import { Projectile } from "../../projectiles/Projectile";
import { Block } from "../../components/blocks/Block";
import { Missile } from "../../projectiles/missiles/Missile";
import { hasValue } from "@/app/util";

export class MissileLauncher extends Weapon {
    ///
    /// PRIVATE
    ///
    private _target: Body;

    constructor(position: Vector) {
        super(position)

        this.setParts([
            new Block(Vector.create(0, 0), 100, 10).body,
        ]);
    }

    public setTarget(target: Body): void {
        this._target = target;
    }

    public fire(): Projectile[] {
        if (!hasValue(this._target)) {
            return [];
        }

        let x: number = Math.cos(this.body.parent.angle) * 101;
        let y: number = Math.sin(this.body.parent.angle) * 101;

        const missile = new Missile(Vector.create(this.position.x + x, this.position.y + y), this.body.parent.angle, this.body.parent.speed, this._target);

        return [missile];
    }
}