import { wrapAngle } from "@/components/Helpers";
import { GameObject } from "../objects/GameObject";
import { Ship } from "../objects/ships/Ship";

export class AI {

    private _target: GameObject;
    private _ship: Ship;
    private _hasFired: boolean = false;

    constructor(ship: Ship, target: GameObject) {
        this._target = target;
        this._ship = ship;
    }

    public update() {
        const x = this._target.position.x - this._ship.position.x;
        const y = this._target.position.y - this._ship.position.y;

        const desiredAngle = Math.atan2(y, x);

        const diffAngle = wrapAngle(desiredAngle - this.ship.angle);

        if (diffAngle < 0) {
            this.ship.turnToPort();
        }
        else {
            this.ship.turnToStarboard();
        }

        if (Math.abs(diffAngle) <= 0.1) {
            if (this._target.isAlive) {
                if (!this._hasFired) {
                    this._ship.fire();

                    this._hasFired = true;

                    setTimeout(() => {
                        this._hasFired = false;
                    }, 250);
                }
            }

        }
    }

    ///
    /// PROPERTIES
    ///

    public get ship(): Ship {
        return this._ship;
    }
}