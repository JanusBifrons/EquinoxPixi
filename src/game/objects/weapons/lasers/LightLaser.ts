import { Vector } from "matter-js";
import { Weapon } from "../Weapon";
import { Laser } from "../../projectiles/lasers/Laser";
import { Projectile } from "../../projectiles/Projectile";
import { Block } from "../../components/blocks/Block";

export class LightLaser extends Weapon {
    constructor(position: Vector) {
        super(position)

        this.setParts([
            new Block(Vector.create(0, 0), 100, 10).body,
        ]);
    }

    public fire(): Projectile[] {
        let x: number = Math.cos(this.body.parent.angle) * 101;
        let y: number = Math.sin(this.body.parent.angle) * 101;

        const laser = new Laser(Vector.create(this.position.x + x, this.position.y + y), this.body.parent.angle, this.body.parent.speed);

        return [laser];
    }
}