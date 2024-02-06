import Matter, { Body, Vector } from "matter-js";
import { GameObject } from "../GameObject";
import { EGameObjectType } from "../GameObjectTypes";
import { Graphics } from "@pixi/graphics";
import { Container } from "pixi.js";
import { Colour } from "@/components/Colour";

export abstract class Component extends GameObject {
    constructor(position: Vector) {
        super(position, EGameObjectType.Component);
    }

    public draw(container: Container): void {
        const graphics = new Graphics();
        graphics.beginFill(new Colour(100, 0, 0).toString());
        graphics.lineStyle(10, 'grey');

        for (let i = 0; i < this.body.vertices.length; i++) {
            const vert = this.body.vertices[i];

            if (i == 0) {
                graphics.moveTo(vert.x, vert.y);
            }
            else {
                graphics.lineTo(vert.x, vert.y);
            }
        }

        graphics.closePath();
        graphics.endFill();

        container.addChild(graphics);
    }
}