
import { Body, Vector } from "matter-js";
import { Block } from "../../components/blocks/Block";
import { Ship } from "../Ship";
import { Cockpit } from "../../components/cockpit/Cockpit";
import { Wing } from "../../components/wings/Wing";
import { ShipStats } from "../ShipStats";
import { LightLaser } from "../../weapons/lasers/LightLaser";
import { MissileLauncher } from "../../weapons/missiles/MissileLauncher";
import { Graphics } from "pixi.js";
import { Component } from "../../components/Component";

export class Havoc extends Ship {

    protected _fillStyle: string = 'rgba(0, 100, 0, 0.25)';

    constructor(position: Vector) {
        super(position, Havoc.Stats());

        //const laserOne = new LightLaser(Vector.create(-50, -200));
        //const laserTwo = new LightLaser(Vector.create(-50, 200));

        //this.addWeapon(laserOne);
        //this.addWeapon(laserTwo);

        //const launcherOne = new MissileLauncher(Vector.create(-50, 200));
        //const launcherTwo = new MissileLauncher(Vector.create(-50, -200));

        //launcherOne.setTarget(this.body);
        //launcherTwo.setTarget(this.body);

        //this.addWeapon(launcherOne);
        //this.addWeapon(launcherTwo);

        const components: Component[] = [
            new Wing(Vector.create(-100, -115)),
            new Wing(Vector.create(-100, 115), true),
            new Cockpit(Vector.create(100, 0))
        ]

        this.setComponents(...components);

        // this.setParts([
        //     //new Cockpit(Vector.create(100, 0)).body,
        //     //new Wing(Vector.create(-100, 115), true).body,
        //     new Wing(Vector.create(-100, -115)).body,
        //     //launcherOne.body,
        //     //launcherTwo.body,
        //     //laserOne.body,
        //     //laserTwo.body
        // ]);

        // const graphics = new Graphics();

        // graphics.position = Vector.create(-100, 115);

        // graphics.beginFill('blue');
        // graphics.moveTo(300, -30);
        // graphics.lineTo(200, -130);
        // graphics.lineTo(0, -280);
        // graphics.lineTo(-50, -300);
        // graphics.lineTo(-50, -320);
        // graphics.lineTo(0, -300);
        // graphics.lineTo(200, -150);
        // graphics.lineTo(300, -50);
        // graphics.closePath();
        // graphics.endFill();

        // this.addGraphics(graphics)
    }

    public static Stats(): ShipStats {
        const stats = new ShipStats();

        stats.accelleration = 0.35;
        stats.torque = 40;
        //stats.torque = 1;

        return stats;
    }
}