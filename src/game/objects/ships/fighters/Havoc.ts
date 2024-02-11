
import { Body, Vector } from "matter-js";
import { Block } from "../../components/blocks/Block";
import { Ship } from "../Ship";
import { Cockpit } from "../../components/cockpit/Cockpit";
import { Wing } from "../../components/wings/Wing";
import { LightLaser } from "../../weapons/lasers/LightLaser";
import { GameObject } from "../../GameObject";
import { Colour } from "@/components/Colour";
import { Stats } from "../../Stats";

export class Havoc extends Ship {

    constructor(position: Vector) {
        super(position);

        this.stats = Havoc.Stats();

        this.body.frictionAir = 0.01;

        this.colours = {
            primaryColour: Colour.Red,
            secondaryColour: Colour.White,
            outlineColour: Colour.Black,
        }

        const laserOne = new LightLaser(Vector.create(-50, -200));
        const laserTwo = new LightLaser(Vector.create(-50, 200));

        this.addWeapon(laserOne);
        this.addWeapon(laserTwo);

        //const launcherOne = new MissileLauncher(Vector.create(-50, 200));
        //const launcherTwo = new MissileLauncher(Vector.create(-50, -200));

        //launcherOne.setTarget(this.body);
        //launcherTwo.setTarget(this.body);

        //this.addWeapon(launcherOne);
        //this.addWeapon(launcherTwo);

        const children: GameObject[] = [
            laserOne,
            laserTwo,
            new Cockpit(Vector.create(100, 0)),
            new Wing(Vector.create(-100, -115)),
            new Wing(Vector.create(-100, 115), true),
        ]

        this.setChildren(...children);
    }

    public static Stats(): Stats {
        const stats = new Stats();

        stats.accelleration = 0.35;
        stats.torque = 10;
        //stats.torque = 1;

        return stats;
    }
}