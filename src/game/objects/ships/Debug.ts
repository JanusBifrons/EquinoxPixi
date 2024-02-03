import { Bodies, Body, Vector } from "matter-js";
import { Ship } from "./Ship";
import { ShipStats } from "./ShipStats";
import { Block } from "../components/blocks/Block";
import { Wing } from "../components/wings/Wing";

export class Debug extends Ship {
    constructor(position: Vector) {
        super(position, Debug.Stats());

        this.setParts([
            new Wing(Vector.create(-100, 120), true).body,
            new Wing(Vector.create(-100, -120)).body,
        ]);
    }

    public static Stats(): ShipStats {
        const stats = new ShipStats();

        stats.accelleration = 0.35;
        stats.torque = 100;

        return stats;
    }
}