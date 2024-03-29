import { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";
import { Colour } from "@/components/Colour";

export class Scrap extends GameObject {
    constructor(body: Body) {
        super(body.position, EGameObjectType.Scrap);

        Body.setPosition(body, body.position);

        this.setBody([body], true);

        //this.container.position = body.position;

        //this.draw(this.container);

        this.body.frictionAir = 0.001;

        const randomAngular = Math.random() > 0.5 ? 0.005 : -0.005;

        Body.setAngularVelocity(this.body, this.body.angularSpeed + randomAngular);
    }
}