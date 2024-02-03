import { Bodies, Body, Vector } from "matter-js";
import { Component } from "../Component";

export class Cockpit extends Component {
    constructor(position: Vector) {
        super(position);

        const verts: Vector[] = [];
        verts.push(Vector.create(-100, 75));
        verts.push(Vector.create(-100, -75));
        verts.push(Vector.create(0, 0));
        // verts.push(Vector.create(-10, 10));
        // verts.push(Vector.create(-30, 20));
        // verts.push(Vector.create(-50, 30));
        // verts.push(Vector.create(-70, 40));
        // verts.push(Vector.create(-150, 40));
        // verts.push(Vector.create(-180, 60));
        // verts.push(Vector.create(-250, 80));
        // verts.push(Vector.create(-250, -80));
        // verts.push(Vector.create(-180, -60));
        // verts.push(Vector.create(-150, -40));
        // verts.push(Vector.create(-70, -40));
        // verts.push(Vector.create(-50, -30));
        // verts.push(Vector.create(-30, -20));
        // verts.push(Vector.create(-10, -10));
        //verts.push(Vector.create(0, 0));

        this.setBody(Bodies.fromVertices(position.x, position.y, [verts]));
    }
}