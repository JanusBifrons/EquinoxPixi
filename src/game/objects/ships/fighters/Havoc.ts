
import { Body, Vector } from "matter-js";
import { Block } from "../../components/blocks/Block";
import { Ship } from "../Ship";
import { Cockpit } from "../../components/cockpit/Cockpit";
import { Wing } from "../../components/wings/Wing";
import { ShipStats } from "../ShipStats";
import { LightLaser } from "../../weapons/lasers/LightLaser";
import { MissileLauncher } from "../../weapons/missiles/MissileLauncher";

export class Havoc extends Ship {

    protected _fillStyle: string = 'rgba(0, 100, 0, 0.25)';

    constructor(position: Vector) {
        super(position, Havoc.Stats());

        // const laserOne = new LightLaser(Vector.create(-50, -200));
        // const laserTwo = new LightLaser(Vector.create(-50, 200));

        // this.addWeapon(laserOne);
        // this.addWeapon(laserTwo);

        const launcherOne = new MissileLauncher(Vector.create(-50, 200));
        const launcherTwo = new MissileLauncher(Vector.create(-50, -200));

        launcherOne.setTarget(this.body);
        //launcherTwo.setTarget(this.body);

        this.addWeapon(launcherOne);
        //this.addWeapon(launcherTwo);

        this.setParts([
            new Cockpit(Vector.create(100, 0)).body,
            new Wing(Vector.create(-100, 118), true).body,
            new Wing(Vector.create(-100, -118)).body,
            launcherOne.body,
            //launcherTwo.body,
            //laserOne.body,
            //laserTwo.body
        ]);
    }

    public static Stats(): ShipStats {
        const stats = new ShipStats();

        stats.accelleration = 0.35;
        stats.torque = 40;
        //stats.torque = 1;

        return stats;
    }
}