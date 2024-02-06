import { Colour } from "@/components/Colour";
import { Ship } from "../Ship";
import { Vector } from "matter-js";
import { Block } from "../../components/blocks/Block";
import { GameObject } from "../../GameObject";
import { ShipStats } from "../ShipStats";

export class Captial extends Ship {
    constructor(position: Vector) {
        super(position, Captial.Stats());

        this.colours = {
            primaryColour: Colour.Green,
            secondaryColour: Colour.White,
            outlineColour: Colour.Black,
        }

        // const laserOne = new LightLaser(Vector.create(-50, -200));
        // const laserTwo = new LightLaser(Vector.create(-50, 200));

        // this.addWeapon(laserOne);
        // this.addWeapon(laserTwo);

        //const launcherOne = new MissileLauncher(Vector.create(-50, 200));
        //const launcherTwo = new MissileLauncher(Vector.create(-50, -200));

        //launcherOne.setTarget(this.body);
        //launcherTwo.setTarget(this.body);

        //this.addWeapon(launcherOne);
        //this.addWeapon(launcherTwo);

        const children: GameObject[] = [
            new Block(Vector.create(0, 0), 1000, 1000),
            new Block(Vector.create(1000, 0), 1000, 1000),
            new Block(Vector.create(-1000, 0), 1000, 1000),
            new Block(Vector.create(2000, 0), 1000, 1000),
            new Block(Vector.create(3000, 0), 1000, 1000),
            new Block(Vector.create(4000, 0), 1000, 1000),
            new Block(Vector.create(5000, 0), 1000, 1000),
        ]

        this.setChildren(...children);
    }

    public static Stats(): ShipStats {
        const stats = new ShipStats();

        stats.accelleration = 0.35;
        stats.torque = 60;
        //stats.torque = 1;

        return stats;
    }
}