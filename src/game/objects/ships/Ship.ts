import { Body, Sleeping, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";
import { Event } from "@/components/Event";
import { Weapon } from "../weapons/Weapon";
import { Projectile } from "../projectiles/Projectile";

export class Ship extends GameObject {
    ///
    /// PRIVATE
    ///
    private _weapons: Weapon[] = [];

    ///
    /// EVENTS
    ///
    public fired: Event = new Event();

    constructor(position: Vector) {
        super(position, EGameObjectType.Ship);
    }

    ///
    /// PROTECTED
    ///

    protected addWeapons(weapons: Weapon[]): void {
        weapons.forEach(w => this.addWeapon(w));
    }

    protected addWeapon(weapon: Weapon): void {
        this._weapons.push(weapon);
    }

    ///
    /// PUBLIC
    ///

    public fire(): void {
        const projectiles: Projectile[] = this._weapons.map(w => w.fire()).flat();

        if (projectiles.length > 0) {
            const drain = projectiles.map(p => p.drain).reduce((a, b) => a + b);

            if (this.stats.power >= drain) {
                this.stats.power -= drain;

                this.fired.raise(this, {
                    projectiles
                });
            }
        }
    }

    public turnToPort(): void {
        this.body.torque = -this.stats.torque;

        Sleeping.set(this.body, false);
    }

    public turnToStarboard(): void {
        this.body.torque = this.stats.torque;

        Sleeping.set(this.body, false);
    }

    public afterBurn(): void {
        let x: number = Math.cos(this.body.angle) * this.stats.accelleration * 5;
        let y: number = Math.sin(this.body.angle) * this.stats.accelleration * 5;

        Body.setVelocity(this.body, Vector.add(this.body.velocity, Vector.create(x, y)));

        Sleeping.set(this.body, false);
    }

    public accellerate() {
        let x: number = Math.cos(this.body.angle) * this.stats.accelleration;
        let y: number = Math.sin(this.body.angle) * this.stats.accelleration;

        Body.setVelocity(this.body, Vector.add(this.body.velocity, Vector.create(x, y)));

        Sleeping.set(this.body, false);
    }

    public decellerate() {
        let x: number = Math.cos(this.body.angle) * this.stats.accelleration;
        let y: number = Math.sin(this.body.angle) * this.stats.accelleration;

        Body.setVelocity(this.body, Vector.add(this.body.velocity, Vector.create(-x, -y)));

        Sleeping.set(this.body, false);
    }

    public applyForce(force: Vector): void {
        Body.applyForce(this.body, this.body.position, force);

        Sleeping.set(this.body, false);
    }
}