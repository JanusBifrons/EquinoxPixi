import { Bodies, Body, Vector } from "matter-js";
import { Ship } from "./Ship";
import { Block } from "../components/blocks/Block";
import { Wing } from "../components/wings/Wing";
import { Stats } from "../Stats";

export class Debug extends Ship {
    constructor(position: Vector) {
        super(position);

        // this.setParts([
        //     new Wing(Vector.create(-100, 120), true).body,
        //     new Wing(Vector.create(-100, -120)).body,
        // ]);
    }

    public static Stats(): Stats {
        const stats = new Stats();

        stats.accelleration = 0.35;
        stats.torque = 100;

        return stats;
    }
}