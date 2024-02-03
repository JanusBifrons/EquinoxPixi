import { Body, Vector } from "matter-js";
import { GameObject } from "./GameObject";
import { EGameObjectType } from "./GameObjectTypes";

export class Scrap extends GameObject {
    constructor(body: Body) {
        super(body.position, EGameObjectType.Scrap);

        Body.setPosition(body, body.position);

        this.setBody(body);

        this.body.frictionAir = 0.001;

        const randomAngular = Math.random() > 0.5 ? 0.01 : -0.01;

        Body.setAngularVelocity(this.body, this.body.angularSpeed + randomAngular);
    }
}