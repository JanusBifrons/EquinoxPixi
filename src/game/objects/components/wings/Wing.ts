import { Bodies, Body, Vector } from "matter-js";
import { Component } from "../Component";
import { Color, Container, DisplayObject, Graphics } from "pixi.js";
import { Colour } from "@/components/Colour";
import { IColours } from "../../GameObject";

export class Wing extends Component {
    constructor(position: Vector, public mirror: boolean = false) {
        super(position);

        const verts: Vector[] = [];

        verts.push(Vector.create(-50, -320));
        verts.push(Vector.create(0, -300));
        verts.push(Vector.create(200, -150));
        verts.push(Vector.create(300, -50));
        verts.push(Vector.create(300, 0));
        verts.push(Vector.create(0, 0));

        const verticies = Bodies.fromVertices(position.x, position.y, [verts]).vertices;

        if (!mirror) {
            this.setBody([Bodies.fromVertices(position.x, position.y, [verts])]);
        }
        else {
            this.setBody([Bodies.fromVertices(position.x, position.y, [verts.map((v => Vector.create(v.x, -v.y)))])]);
        }
    }

    public draw(container: Container, colours: IColours): void {
        super.draw(container, colours);

        const graphics = new Graphics();
        const verts = [];

        verts.push(Vector.create(300, -30));
        verts.push(Vector.create(200, -130));
        verts.push(Vector.create(0, -280));
        verts.push(Vector.create(-50, -300));
        verts.push(Vector.create(-50, -320));
        verts.push(Vector.create(0, -300));
        verts.push(Vector.create(200, -150));
        verts.push(Vector.create(300, -50));

        let verticies;

        if (this.mirror) {
            verticies = Bodies.fromVertices(this.body.position.x + 22, this.body.position.y + 70, [verts.map(v => Vector.create(v.x, -v.y))]).vertices;
        }
        else {
            verticies = Bodies.fromVertices(this.body.position.x + 22, this.body.position.y - 70, [verts]).vertices;
        }

        graphics.beginFill(colours.secondaryColour.toString());
        graphics.lineStyle(5, colours.outlineColour.toString());

        for (let i = 0; i < verticies.length; i++) {
            const vert = verticies[i];

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